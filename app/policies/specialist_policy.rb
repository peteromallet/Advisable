# frozen_string_literal: true

# Authorization logic for specialists logic. This policy is primarily used
# inside of graphql queries and mutations, however, it is just a simple pundit
# policy and can easily be used outside of graphql.

class SpecialistPolicy < BasePolicy
  # Checks if the specialist is the current user
  def specialist?
    record == current_user
  end

  # checks whether the specialist has applied to any of the current user company's projects
  def applicant_of_company_projects?
    current_user.is_a?(::User) && current_user.company.projects.joins(:applications).exists?(applications: {specialist_id: record.id})
  end
end
