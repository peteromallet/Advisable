class Types::PreviousProject < Types::BaseType
  field :project, Types::PreviousProjectUnion, null: false
  field :reviews, [Types::Review], null: false
end
