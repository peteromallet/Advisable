# Authorization logic for specialists logic. This policy is primarily used
# inside of graphql queries and mutations, however, it is just a simple pundit
# policy and can easily be used outside of graphql.

class SpecialistPolicy < BasePolicy
  # Checks if the specialist is the current user
  def is_specialist
    record == user
  end

  # checks wether the specialist has applied to any of the current users
  # projects
  def is_applicant_of_user_project
    return false if user.blank?

    record.projects.where(user_id: user.id).any?
  end
end
