class Airtable::Booking < Airtable::Base
  self.table_name = "Bookings"

  sync_with ::Booking
  sync_columns :type, :rate, :rate_type, :rate_limit, :status,
               :duration, :decline_reason

  sync_data do |booking|
    booking.deliverables = JSON.parse(fields['Deliverables']) if fields['Deliverables']

    application_id = fields["Application"].try(:first)
    if application_id
      application = ::Application.find_by_airtable_id(application_id)
      application = Airtable::Application.find(application_id).sync if application.nil?
      booking.application = application
    end
  end
end
