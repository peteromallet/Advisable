class Types::Interview < Types::BaseType
  field :id, ID, null: false
  field :airtable_id, String, null: true
  field :availability, [GraphQL::Types::ISO8601DateTime], null: false
  field :time_zone, String, null: true
  field :status, String, null: true
  field :starts_at, GraphQL::Types::ISO8601DateTime, null: true
  field :application, Types::ApplicationType, null: false
  field :user, Types::User, null: false
  field :specialist, Types::SpecialistType, null: true

  def id
    object.uid || object.airtable_id
  end

  def time_zone
    return object.time_zone if object.time_zone.present?
    object.user.try(:time_zone)
  end
end
