class UnresponsiveSpecialistJob < ApplicationJob
  queue_as :default

  attr_reader :application

  def perform(application)
    @application = application
    unresponsive_since
  end

  private

  def unresponsive_since
    messages = TalkjsApi.new.messages(application.uid)
    last_message_from_specialist = messages.find { |m| m["senderId"] == application.specialist.uid }
    Time.zone.at(last_message_from_specialist["createdAt"] / 1000)
  end
end
