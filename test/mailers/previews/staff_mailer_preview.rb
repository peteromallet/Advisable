# frozen_string_literal: true

class StaffMailerPreview < ActionMailer::Preview
  def unresponsive_specialist
    StaffMailer.unresponsive_specialist(random_report)
  end

  def unresponsive_client
    StaffMailer.unresponsive_client(random_report)
  end

  def problematic_specialist
    random_flag = ProblematicFlag.order(Arel.sql("RANDOM()")).first
    StaffMailer.problematic_specialist(random_flag)
  end

  private

  def random_report
    UnresponsivenessReport.order(Arel.sql("RANDOM()")).first
  end
end
