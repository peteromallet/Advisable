# frozen_string_literal: true

module Airtable
  def self.sync
    Zeitwerk::Loader.eager_load_all
    report = Airtable::SyncReport.new

    started_at = Time.zone.now
    Rails.logger.info("Syncing data from airtable...")

    ActiveRecord::Base.logger.silence do
      Airtable::Base.descendants.each do |table|
        table.sync(report, started_at: started_at)
      end
    end

    duration = Time.at(Time.now - started_at).utc.strftime("%H:%M:%S")
    Rails.logger.info("Finished airtable sync: [#{duration}]")

    # :nocov:
    return if report.failures.none?

    output = "Some records failed to sync \n"
    report.failures.each do |failure|
      output += "#{failure[:type]} #{failure[:id]}: #{failure[:errors]}\n"
    end
    Rails.logger.info(output)
    # :nocov:
  end
end
