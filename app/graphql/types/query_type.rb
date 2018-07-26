class Types::QueryType < GraphQL::Schema::Object

  field :project, Types::ProjectType, description: "Find a Project by ID", null: true do
    argument :id, ID, required: true
  end

  def project(**args)
    begin
      Project.find_by_airtable_id(args[:id])
    rescue Airrecord::Error => er
      GraphQL::ExecutionError.new("Could not find project #{args[:id]}")
    end
  end

  field :application_rejection_reasons, [Types::ApplicationRejectionReasonType, null: true], null: true

  def application_rejection_reasons
    ::ApplicationRejectionReason.all
  end

  field :booking_rejection_reasons, [Types::BookingRejectionReason, null: true], null: true

  def booking_rejection_reasons
    ::BookingRejectionReason.all
  end

  field :booking, Types::Booking, description: "Find a booking by ID", null: false do
    argument :id, ID, required: true
  end

  def booking(id: )
    begin
      ::Booking.find_by_airtable_id(id)
    rescue Airrecord::Error => er
      GraphQL::ExecutionError.new("Could not find booking #{id}")
    end
  end
end
