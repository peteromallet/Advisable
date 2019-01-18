class Types::Ratings < Types::BaseType
  field :overall, Float, null: true
  field :skills, Float, null: true
  field :availability, Float, null: true
  field :adherence_to_schedule, Float, null: true
  field :quality_of_work, Float, null: true
  field :communication, Float, null: true
end