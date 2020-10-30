class Project
  module Constants
    STATUSES = [
      "Project Created",
      "Call Scheduled",
      "Candidate Proposed",
      "Candidate Accepted",
      "Brief Confirmed",
      "Brief Pending Confirmation",
      "Booking Request Sent",
      "Proposal Received",
      "Interview Scheduled",
      "Interview Completed",
      "Booking Confirmed",
      "Candidates Accepted",
      "Candidates Sourcing",
      "Project Qualified",
      "Draft",
      "Pending Advisable Confirmation"
    ].freeze

    SERVICE_TYPES = [
      "Assisted",
      "Self-Service",
      "Consultation"
    ].freeze

    SALES_STATUSES = %w[
      Open
      Won
      Lost
      Pending
      Paused
    ].freeze

    INDUSTRY_EXPERIENCE_IMPORTANCE = {
      "Not Important" => 0,
      "Not Sure" => 1,
      "Important" => 2,
    }.freeze

    LOCATION_IMPORTANCE = {
      "Not Important" => 0,
      "Not Sure" => 1,
      "Important" => 2,
    }.freeze

    LIKELY_TO_HIRE = {
      "Not Likely" => 0,
      "Maybe" => 1,
      "Very Likely" => 2,
    }.freeze
  end
end
