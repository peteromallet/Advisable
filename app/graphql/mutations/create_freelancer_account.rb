# Creates a new freelancer account
class Mutations::CreateFreelancerAccount < Mutations::BaseMutation
  include Mutations::Helpers::Authentication

  description <<~HEREDOC
    Creates a new freelancer account
  HEREDOC

  argument :first_name, String, required: true do
    description 'The freelancers first name'
  end

  argument :last_name, String, required: true do
    description 'The freelancers last name'
  end

  argument :email, String, required: true do
    description 'The freelancers email address'
  end

  argument :phone, String, required: false do
    description 'The freelancers phone number'
  end

  argument :password, String, required: true do
    description 'The account password'
  end

  argument :skills, [String], required: true do
    description 'An array of skills'
  end

  argument :pid, String, required: false do
    description 'The project ID that they are signing up for.'
  end

  argument :campaign_name, String, required: false do
    description 'The name of the campaign they signed up from'
  end

  argument :campaign_source, String, required: false do
    description 'The source of the campaign they signed up from'
  end

  argument :referrer, String, required: false do
    description 'The rerrer they signed up from'
  end

  field :viewer, Types::ViewerUnion, null: false

  def resolve(**args)
    skills =
      args[:skills].map do |name|
        skill = Skill.find_by(name: name)
        if skill.nil?
          raise ApiError::InvalidRequest.new(
                  'skillNotFound',
                  "Skill '#{name}' does not exist"
                )
        end
        skill
      end

    # TODO: AccountMigration - remove duplicated fields
    account = Account.new(
          first_name: args[:first_name],
          last_name: args[:last_name],
          email: args[:email],
          password: args[:password]
        )

    specialist = Specialist.new(
      first_name: args[:first_name],
      last_name: args[:last_name],
      email: args[:email],
      campaign_name: args[:campaign_name],
      campaign_source: args[:campaign_source],
      account: account,
      application_stage: 'Started',
      phone: args[:phone],
      pid: args[:pid],
      referrer: args[:referrer]
    )

    unless account.valid? && specialist.valid?
      if account.errors.added?(:email, "has already been taken")
        raise ApiError::InvalidRequest.new('emailTaken', 'This email is already being used by another account')
      end
    end

    specialist.skills = skills

    if specialist.save
      specialist.sync_to_airtable
      create_application_record(specialist, args[:pid])
      specialist.send_confirmation_email
    end

    context[:current_user] = specialist
    login_as(account)

    {viewer: specialist.reload}
  end

  private

  # When a freelancer signs up, they may have come from a campaign that passed
  # a pid (project ID) as a query param. This can be sent with the signup
  # mutation to create an application record for that project.
  def create_application_record(specialist, pid)
    return unless pid
    project = Project.find_by_uid_or_airtable_id(pid)
    project = Airtable::Project.find(pid).sync if project.nil?
    return if project.blank?
    application = specialist.applications.create(project: project, status: 'Invited To Apply')
    application.sync_to_airtable({'Source' => 'new-signup'})
  end
end
