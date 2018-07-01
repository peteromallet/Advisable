class Types::RejectionReasonType < Types::BaseType
  field :id, ID, null: false
  field :reason, String, null: true
end
