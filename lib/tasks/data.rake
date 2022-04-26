# frozen_string_literal: true

require "ruby-progressbar"
require_relative "../../config/environment"

namespace :data do
  task prepare: :environment do
    TestData.new.seed!
  end

  task create_file: :environment do
    ProductionData.new.create_file!
  end

  task migrate_consultations: :environment do
    migrate_requests
    migrate_declined
  end
end

def migrate_requests
  Message.where(kind: "ConsultationRequest").find_each do |message|
    ActiveRecord::Base.transaction do
      interview = message.consultation.interview || create_interview_from(message.consultation)
      message.update!(kind: "InterviewRequest", interview:, consultation: nil)
    end
  end
end

def migrate_declined
  Message.where(kind: "ConsultationDeclined").find_each do |message|
    ActiveRecord::Base.transaction do
      interview = create_interview_from(message.consultation)
      message.update!(kind: "InterviewDeclined", interview:, consultation: nil)
    end
  end
end

def create_interview_from(consultation)
  status = consultation.status == "Request Reminded" ? "Auto Declined" : "Specialist Declined"
  Interview.create!(
    status:,
    user: consultation.user,
    specialist: consultation.specialist,
    created_at: consultation.created_at,
    updated_at: consultation.updated_at
  )
end
