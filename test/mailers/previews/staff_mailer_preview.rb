# frozen_string_literal: true

class StaffMailerPreview < ActionMailer::Preview
  def unresponsive_specialist
    StaffMailer.unresponsive_specialist(random_report)
  end

  private

  def random_report
    UnresponsivenessReport.order(Arel.sql('RANDOM()')).first
  end
end
