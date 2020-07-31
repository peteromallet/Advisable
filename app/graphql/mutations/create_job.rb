class Mutations::CreateJob < Mutations::BaseMutation
  field :project, Types::ProjectType, null: true

  def authorized?(**args)
    user = context[:current_user]
    raise ApiError::NotAuthenticated.new if !user
    true
  end

  def resolve(**args)
    user = context[:current_user]
    # If the users city has not yet been set then schedule the geocode job
    unless user.address.provided?
      GeocodeUserJob.perform_later(user.id, context[:client_ip])
    end

    project = user.projects.create(status: :draft, service_type: 'Self-Service')

    { project: project }
  end
end
