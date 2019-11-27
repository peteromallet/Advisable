class Mutations::CreateConsultation < Mutations::BaseMutation
  argument :specialist, ID, required: true
  argument :first_name, String, required: true
  argument :last_name, String, required: true
  argument :email, String, required: true
  argument :company, String, required: true
  argument :availability, [String], required: true
  argument :skill, String, required: true
  argument :topic, String, required: true

  field :consultation, Types::ConsultationType, null: true

  def resolve(**args)
    ActiveRecord::Base.transaction do
      consultation = create_consultation(**args)
      { consultation: consultation }
    end
  end

  private

  def create_consultation(**args)
    skill_id = Skill.find_by_name!(args[:skill]).airtable_id

    consultation = Consultation.create(
      user: user(**args),
      specialist: specialist(args[:specialist]),
      status: "Request Started",
      skills: [skill_id],
      topic: args[:topic],
    )

    consultation.sync_to_airtable
    consultation
  end

  def specialist(specialist_id)
    @specialist ||= Specialist.find_by_uid_or_airtable_id!(specialist_id)
  end

  def user(**args)
    @user ||= begin
      user = User.find_by_email(args[:email])

      if user.present?
        user.update(availability: args[:availability])
        return user
      end

      specialist = Specialist.find_by_email(args[:email])
      if specialist.present?
        raise ApiError::InvalidRequest.new("emailBelongsToFreelancer", "This email belongs to a freelancer account")
      end

      user = User.create(
        first_name: args[:first_name],
        last_name: args[:last_name],
        email: args[:email],
        availability: args[:availability],
        company_name: args[:company],
      )
      
      domain = user.email.split("@").last
      client = Client.create(name: args[:company], domain: domain)
      client.users << user
      user.sync_to_airtable
      # Currently we dont have a relationship between clients and client
      # contacts so we set the 'Client Contacts' column while calling sync.
      client.sync_to_airtable({ "Client Contacts" => [user.airtable_id].compact })
      user
    end
  end
end
