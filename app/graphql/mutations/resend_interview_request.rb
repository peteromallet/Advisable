class Mutations::ResendInterviewRequest < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :availability, [String], required: true
  argument :time_zone, String, required: true

  field :interview, Types::Interview, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    {
      interview:
        Interviews::ResendInterviewRequest.call(
          interview: Interview.find_by_uid_or_airtable_id!(args[:id]),
          availability: args[:availability],
          time_zone: args[:time_zone]
        )
    }
  rescue Service::Error => e
    return { errors: [e] }
  end
end
