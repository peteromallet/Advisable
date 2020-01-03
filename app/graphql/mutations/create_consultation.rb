class Mutations::CreateConsultation < Mutations::BaseMutation
  argument :specialist, ID, required: true
  argument :first_name, String, required: true
  argument :last_name, String, required: true
  argument :email, String, required: true
  argument :company, String, required: true
  argument :skill, String, required: true

  argument :utm_source, String, required: false
  argument :utm_campaign, String, required: false
  argument :utm_medium, String, required: false
  argument :gclid, String, required: false

  field :consultation, Types::ConsultationType, null: true

  def resolve(**args)
    ActiveRecord::Base.transaction do
      consultation = create_consultation(**args)
      { consultation: consultation }
    end
  end

  private

  def create_consultation(**args)
    skill = Skill.find_by_name!(args[:skill])
    user = user(**args)
    specialist_record = specialist(args[:specialist])

    consultation =
      user.consultations.find_by(
        specialist: specialist_record, status: 'Request Started'
      )

    if consultation.present?
      consultation.update(skill: skill)
      consultation.sync_to_airtable
      return consultation
    end

    consultation =
      Consultation.create(
        user: user(**args),
        specialist: specialist_record,
        status: 'Request Started',
        skill: skill,
        source: args[:utm_source]
      )

    consultation.sync_to_airtable
    consultation
  end

  def specialist(specialist_id)
    @specialist ||= Specialist.find_by_uid_or_airtable_id!(specialist_id)
  end

  def user(**args)
    @user ||=
      begin
        user = User.find_by_email(args[:email])
        return user if user.present?

        specialist = Specialist.find_by_email(args[:email])
        if specialist.present?
          raise ApiError::InvalidRequest.new(
                  'emailBelongsToFreelancer',
                  'This email belongs to a freelancer account'
                )
        end

        user =
          User.create(
            first_name: args[:first_name],
            last_name: args[:last_name],
            email: args[:email],
            company_name: args[:company],
            campaign_source: args[:utm_source],
            campaign_name: args[:utm_campaign],
            campaign_medium: args[:campaign_medium],
            gclid: args[:gclid]
          )

        domain = user.email.split('@').last
        client = Client.create(name: args[:company], domain: domain)
        client.users << user
        user.sync_to_airtable
        # Currently we dont have a relationship between clients and client
        # contacts so we set the 'Client Contacts' column while calling sync.
        client.sync_to_airtable(
          { 'Client Contacts' => [user.airtable_id].compact }
        )
        user
      end
  end
end
