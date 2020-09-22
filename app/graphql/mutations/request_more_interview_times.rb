class Mutations::RequestMoreInterviewTimes < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :availability_note, String, required: false

  field :interview, Types::Interview, null: true

  ALLOWED_STATUSES = [
    'Call Requested',
    'Need More Time Options',
    'More Time Options Added'
  ]

  def resolve(**args)
    interview = Interview.find_by_uid_or_airtable_id(args[:id])

    unless ALLOWED_STATUSES.include?(interview.status)
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
