# frozen_string_literal: true

# Authorization logic for specialists logic. This policy is primarily used
# inside of graphql queries and mutations, however, it is just a simple pundit
# policy and can easily be used outside of graphql.

class SpecialistPolicy < BasePolicy
  # Checks if the specialist is the current user
  def is_specialist? # rubocop:disable Naming/PredicateName
    record == user
  end

  # checks whether the specialist has applied to any of the current user company's projects
  def is_applicant_of_company_projects # rubocop:disable Naming/PredicateName
    user.is_a?(::User) && user.company.projects.joins(:applications).exists?(applications: {specialist_id: record.id})
  end
end
