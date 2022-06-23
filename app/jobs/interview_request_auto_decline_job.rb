# frozen_string_literal: true

class InterviewRequestAutoDeclineJob < ApplicationJob
  def perform
    Interview.reminded.where(created_at: ..4.days.ago).each(&:auto_decline!)
  end
end
