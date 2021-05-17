# frozen_string_literal: true

module Mutations
  class CreateJob < Mutations::BaseMutation
    field :project, Types::ProjectType, null: true

    def authorized?(**_args)
      requires_current_user!
    end

    def resolve(**_args)
      # If the users city has not yet been set then schedule the geocode job
      GeocodeAccountJob.perform_later(current_user.account, context[:client_ip]) unless current_user.company.address.provided?
      project = current_user.projects.create(status: "Draft", service_type: 'Self-Service')

      {project: project}
    end
  end
end
