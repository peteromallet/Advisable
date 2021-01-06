# frozen_string_literal: true

class StaffMailerPreview < ActionMailer::Preview
  def unresponsive_specialist
    StaffMailer.unresponsive_specialist(random_application, rand(30))
  end

  private

  def random_application
    Application.order(Arel.sql('RANDOM()')).first
  end
end
