class Mutations::RequestMoreInterviewTimes < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :availability_note, String, required: false

  field :interview, Types::Interview, null: true

  def resolve(**args)
    interview = Interview.find_by_airtable_id!(args[:id])

    if interview.status != 'Call Requested'
      raise ApiError::InvalidRequest.new(
              'interview.notRequested',
              'Interview is not in a requested state'
            )
    end

    interview.update(
      status: 'Need More Time Options',
      availability_note: args[:availability_note]
    )

    interview.sync_to_airtable

    { interview: interview }
  end
end
