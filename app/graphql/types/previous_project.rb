class Types::PreviousProject < Types::BaseType
  field :id, ID, null: false
  field :type, PreviousProjectTypeAttribute, null: false
  field :title, String, null: true
  field :description, String, null: true
  field :client_name, String, null: true
  field :client_description, String, null: true
  field :requirements, String, null: true
  field :results, String, null: true
  field :project, Types::ProjectType, null: false
  field :application, Types::ApplicationType, null: false
  field :reviews, [Types::Review], null: false

  def id
    object.project.airtable_id
  end

  def type
    object.project.class.to_s
  end
end