# Creates a new freelancer account
class Mutations::CreateFreelancerAccount < Mutations::BaseMutation
  description <<~HEREDOC
    Creates a new freelancer account
  HEREDOC

  argument :first_name, String, required: true do
    description "The freelancers first name"
  end

  argument :last_name, String, required: true do
    description "The freelancers last name"
  end

  argument :email, String, required: true do
    description "The freelancers email address"
  end

  argument :password, String, required: true do
    description "The account password"
  end

  argument :skills, [String], required: true do
    description "An array of skills"
  end

  field :token, String, null: false
  field :viewer, Types::ViewerUnion, null: false

  def resolve(**args)
    skills = args[:skills].map do |name|
      skill = Skill.find_by_name(name)
        if skill.nil?
          raise APIError::InvalidRequest.new(
            "skillNotFound",
            "Skill '#{name}' does not exist"
          )
        end
      skill
    end

    account = Specialist.new(
      first_name: args[:first_name],
      last_name: args[:last_name],
      email: args[:email],
      password: args[:password],
    )

    unless account.valid?
      if account.errors.added?(:email, :taken)
        raise APIError::InvalidRequest.new(
          "emailTaken",
          "This email is already being used by another account"
        )
      end

      raise APIError::InvalidRequest.new(
        "invalidAccountDetails",
        account.errors.full_messages.first
      )
    end

    account.skills = skills

    if account.save
      account.sync_to_airtable
      account.send_confirmation_email
    end

    context[:current_user] = account
    token = Accounts::Jwt.call(account)

    {
      token: token,
      viewer: account
    }
  end
end
