Types::RejectionReasonType = GraphQL::ObjectType.define do
  name 'RejectionReason'
  field :id, !types.ID
  field :reason, types.String
end
