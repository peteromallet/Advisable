class Airtable::Booking < Airtable::Base
  self.table_name = "Bookings"

  sync_with ::Booking
  sync_columns :type, :rate, :rate_type, :rate_limit, :status,
               :duration, :decline_comment, :proposal_comment,
               :client_decline_comment

  sync_data do |booking|
    booking.deliverables = JSON.parse(fields['Deliverables']) if fields['Deliverables']

    start_date = fields['Est. Project Start Date']
    booking.start_date = Date.parse(start_date) if start_date
    end_date = fields['Est. Project End Date']
    booking.end_date = Date.parse(end_date) if end_date

    application_id = fields["Application"].try(:first)
    if application_id
      application = ::Application.find_by_airtable_id(application_id)
      application = Airtable::Application.find(application_id).sync if application.nil?
      booking.application = application
    end

    rejected_reason_id = fields["Rejected Reason"].try(:first)
    if rejected_reason_id
      rejection_reason = ::BookingRejectionReason.find_by_airtable_id(rejected_reason_id)
      rejection_reason = Airtable::BookingRejectedReason.find(rejected_reason_id).sync if rejection_reason.nil?
      booking.rejection_reason = rejection_reason
    end
  end
end
