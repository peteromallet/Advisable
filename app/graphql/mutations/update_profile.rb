class Mutations::UpdateProfile < Mutations::BaseMutation
  argument :primarily_freelance, Boolean, required: false
  argument :hourly_rate, Int, required: false
  argument :number_of_projects, String, required: false
  argument :bio, String, required: false
  argument :skills, [String], required: false
  argument :city, String, required: false
  argument :country, ID, required: false
  argument :remote, Boolean, required: false
  argument :avatar, String, required: false
  argument :linkedin, String, required: false
  argument :website, String, required: false
  argument :resume, String, required: false
  argument :public_use, Boolean, required: false

  field :specialist, Types::SpecialistType, null: true

  def authorized?(**args)
    if !context[:current_user]
      raise APIError::NotAuthenticated.new("You are not logged in")
    end

    if context[:current_user].is_a?(User)
      raise APIError::NotAuthenticated.new("You are logged in as a user")
    end

    true
  end

  def resolve(**args)
    {
      specialist: Specialists::UpdateProfile.call(
        specialist: context[:current_user],
        attributes: args.except(:id)
      )
    }

    rescue Service::Error => e
      raise APIError::InvalidRequest.new("failedToUpdate", e.message)
  end
end
