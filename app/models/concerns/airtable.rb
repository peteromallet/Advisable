module Airtable
  def self.sync
    Rails.application.eager_load!
    report = Airtable::SyncReport.new
    Airtable::Base.descendants.each do |table|
      table.sync(report)
    end

    if report.failures.any?
      output = "Some records failed to sync \n"
      report.failures.each do |failure|
        output += "#{failure[:type]} #{failure[:id]}: #{failure[:errors]}\n"
      end
      Rollbar.scope({:fingerprint => "airtablesync"}).warn(output)
      puts output
    end
  end
end
