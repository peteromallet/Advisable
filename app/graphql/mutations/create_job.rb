# frozen_string_literal: true

class Mutations::CreateJob < Mutations::BaseMutation
  field :project, Types::ProjectType, null: true

  def authorized?(**args)
    requires_current_user!
  end

  def resolve(**args)
    # If the users city has not yet been set then schedule the geocode job
    unless current_user.company.address.provided?
      GeocodeUserJob.perform_later(current_user.id, context[:client_ip])
    end

    project = current_user.projects.create(status: "Draft", service_type: 'Self-Service')

    {project: project}
  end
end
