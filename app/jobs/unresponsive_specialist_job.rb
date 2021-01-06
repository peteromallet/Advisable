# frozen_string_literal: true

class UnresponsiveSpecialistJob < ApplicationJob
  queue_as :default

  attr_reader :report

  def perform(unresponsiveness_report)
    @report = unresponsiveness_report
    # send email to sales person with report.message and unresponsive_since
  end

  private

  def unresponsive_since
    messages = TalkjsApi.new.messages(report.application.uid)
    last_message_from_specialist = messages.find { |m| m["senderId"] == report.application.specialist.uid }
    Time.zone.at(last_message_from_specialist["createdAt"] / 1000)
  end
end
