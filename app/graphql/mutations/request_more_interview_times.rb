class Mutations::RequestMoreInterviewTimes < Mutations::BaseMutation
  argument :id, ID, required: true

  field :interview, Types::Interview, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    {
      interview: Interviews::RequestMoreTimes.call(
        interview: Interview.find_by_airtable_id(args[:id]),
      )
    }

    rescue Service::Error => e
      return { errors: [e] }
  end
end
