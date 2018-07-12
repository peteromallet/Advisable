# Syns the "Application - Rejecetd Reason" table in Airtable with the
# local application_rejection_reasons table. It's important to note that
# in airtable they are referred to as 'rejected' reasons and locally
# we refer to them as 'rejection' reasons.
#
class Airtable::ApplicationRejectedReason < Airtable::Base
  self.table_name = "Application - Rejected Reason"

  # Tells which active record model to sync data with.
  sync_with ::ApplicationRejectionReason
  sync_columns :reason
end
