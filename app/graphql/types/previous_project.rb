class Types::PreviousProject < Types::BaseType
  field :specialist, Types::SpecialistType, null: false
  field :project, Types::PreviousProjectUnion, null: false
  field :reviews, [Types::Review], null: false
end
