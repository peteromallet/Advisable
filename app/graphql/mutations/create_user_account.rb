# Creates a new freelancer account
class Mutations::CreateUserAccount < Mutations::BaseMutation
  description <<~HEREDOC
    Creates a new user account
  HEREDOC

  argument :skill, String, required: true do
    description "The skill they are looking for"
  end

  argument :industry, String, required: true do
    description "The industry"
  end

  argument :company_type, String, required: true do
    description "The type of company"
  end

  argument :email, String, required: false do
    description "Their email"
  end

  # Currently we don't have full account signups in app. i.e setting the user
  # password at the time of creating their account. For now the API only needs
  # to return the project record that is created.
  field :project, Types::ProjectType, null: false

  def resolve(**args)
    skill = Skill.find_by_name!(args[:skill])
    industry = Industry.find_by_name!(args[:industry])

    ActiveRecord::Base.transaction do
      user = create_user(email: args[:email])
      client = create_client(user: user)
      project = create_project(user: user, skill: skill, industry: industry, company_type: args[:company_type])
      
      user.sync_to_airtable
      # Currently we dont have a relationship between clients and client
      # contacts so we set the 'Client Contacts' column while calling sync.
      client.sync_to_airtable({ "Client Contacts" => [user.airtable_id].compact })
      project.sync_to_airtable
      return { project: project }
    end
  end

  private

  def create_user(email: )
    user = User.new(email: email)

    unless user.valid?
      if user.errors.added?(:email, :taken)
        raise ApiError::InvalidRequest.new("emailTaken", "The email #{email} is already used by another account")
      end

      raise ApiError::InvalidRequest.new("resourceInvalid", user.errors.full_messages.first)
    end

    user
  end

  def create_client(user: )
    domain = user.email.split("@").last
    client = Client.new(domain: domain)

    unless client.valid?
      raise ApiError::InvalidRequest.new("resourceInvalid", client.errors.full_messages.first)
    end

    client
  end

  def create_project(user:, skill:, industry:, company_type:)
    project = Project.new(
      user: user,
      name: skill.name,
      industry: industry.name,
      primary_skill: skill.name,
      company_type: company_type
    )

    unless project.valid?
      raise ApiError::InvalidRequest.new("resourceInvalid", project.errors.full_messages.first)
    end
    
    project.skills << skill
    project
  end
end
