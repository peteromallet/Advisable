module Airtable
  def self.sync
    Rails.application.eager_load!
    report = Airtable::SyncReport.new

    started_at = DateTime.now
    Rails.logger.info("Syncing data from airtable...")

    ActiveRecord::Base.logger.silence do
      Airtable::Base.descendants.each do |table|
        table.sync(report)
      end
    end

    duration = Time.at(Time.now - started_at).utc.strftime("%H:%M:%S")
    Rails.logger.info("Finished airtable sync: [#{duration}]")

    # :nocov:
    if report.failures.any?
      output = "Some records failed to sync \n"
      report.failures.each do |failure|
        output += "#{failure[:type]} #{failure[:id]}: #{failure[:errors]}\n"
      end
      Rails.logger.info(output)
    end
    # :nocov:
  end
end
