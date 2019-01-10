class Types::Review < Types::BaseType
  field :id, ID, null: false
  field :comment, String, null: false
  field :type, String, null: true
  field :ratings, Types::Ratings, null: false
  field :specialist, Types::SpecialistType, null: false

  def id
    object.airtable_id
  end
end
