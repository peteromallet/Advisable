# Syncs the "Booking - Rejecetd Reason" table in Airtable with the
# local booking_rejection_reasons table. It's important to note that
# in airtable they are referred to as 'rejected' reasons and locally
# we refer to them as 'rejection' reasons.
#
class Airtable::BookingRejectedReason < Airtable::Base
  self.table_name = "Bookings - Rejected Reason"

  sync_with ::BookingRejectionReason
  sync_column 'Name', to: :name
end
