namespace :migrate do
  # Script to convert booking records into tasks
  task create_tasks_for_bookings: :environment do
    # Find any applications that have a booking record with one of these
    # statuses
    applications = Application.joins(:bookings).where(bookings: {
      status: ["Proposed", "Offered", "Accepted", "Declined", "Complete"]
    }).distinct

    # iterate through each one
    applications.find_each do |application|
      # Next if there are already tasks for the application
      next if application.tasks.any?
      # get the correct associated booking.
      booking = application.offer
      if application.status == "Proposed"
        booking = application.proposal
      end

      next unless booking.present?

      airtable = Airtable::Booking.find(booking.airtable_id)
      stage = ""
      stage = "Not Assigned" if booking.status == "Proposed"
      stage = "Assigned" if booking.status == "Offered"
      stage = "Working" if booking.status == "Accepted"
      stage = "Not Assigned" if booking.status == "Declined"
      stage = "Paid" if booking.status == "Complete"
      stage = "Paid" if booking.status == "Live"
      stage = "Working" if airtable["Live"] == "Yes"

      deliverables = booking.deliverables.reject { |d| d.empty? }
      task = application.tasks.create(
        name: "#{booking.application.project.primary_skill} Project",
        stage: stage,
        due_date: booking.end_date,
        description: deliverables.map { |d| "- #{d}" }.join("\n"),
      )

      task.sync_to_airtable
    end
  end

  task convert_applications_to_working: :environment do
    applications = Application.joins(:bookings).where(bookings: { status: ["Accepted", "Complete"] }).distinct

    applications.find_each do |application|
      application.status = "Working"
      application.save(validate: false)
      application.sync_to_airtable
    end
  end
end
