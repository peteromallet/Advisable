class Airtable::RejectedReason < Airtable::Base
  self.table_name = "Rejected Reason"

  has_many :applications, column: "Applications"

  # Tells which active record model to sync data with.
  sync_with ::RejectionReason
  sync_columns :reason
end
