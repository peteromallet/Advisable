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

  task migrate_hourly_rates: :environment do
    specialists = Specialist.where.not(hourly_rate: nil)
    progressbar = ProgressBar.create(format: "Migrating interviews: %a %b\u{15E7}%i %p%% %e", progress_mark: " ", remainder_mark: "\u{FF65}", total: specialists.count)
    specialists.each do |specialist|
      hourly_rate = (specialist.hourly_rate / 100).round.to_i

      price_range_index = case hourly_rate
      when (..75)
        0
      when 75..150
        1
      when 150..300
        2
      when (300..)
        3
      end
      specialist.price_range = ::Specialist::VALID_PRICE_RANGES[price_range_index]

      specialist.save
      progressbar.increment
    end
  end

  task interview_participants: :environment do
    progressbar = ProgressBar.create(format: "Migrating interviews: %a %b\u{15E7}%i %p%% %e", progress_mark: " ", remainder_mark: "\u{FF65}", total: Interview.count)
    Interview.find_each do |interview|
      next if interview.specialist_id.nil? && interview.user_id.nil?

      accounts = interview.participants
      interview.update!(
        specialist: nil,
        user: nil,
        accounts:
      )
      progressbar.increment
    end
  end

  task migrate_notifications: :environment do
    progressbar = ProgressBar.create(format: "Migrating notifications: %a %b\u{15E7}%i %p%% %e", progress_mark: " ", remainder_mark: "\u{FF65}", total: Notification.count)
    notifications = Notification.pluck(:id, :notifiable_id, :notifiable_type, :guild_post_id)
    notifications.each do |id, post_id, type, guild_post_id|
      progressbar.increment
      next unless guild_post_id.nil?
      next unless type == "Guild::Post"
      next if post_id.nil? || !Guild::Post.exists?(id: post_id)

      Notification.find(id).update_columns(guild_post_id: post_id)
    end
  end

  task users_availability: :environment do
    progressbar = ProgressBar.create(format: "Migrating user availabilities: %a %b\u{15E7}%i %p%% %e", progress_mark: " ", remainder_mark: "\u{FF65}", total: User.count)
    User.pluck(:account_id, :availability).each do |account_id, availability|
      next if availability.blank?

      Account.find(account_id).update_columns(availability:)
      progressbar.increment
    end
  end

  task migrate_reschedule_request_statuses: :environment do
    Interview.where(status: ["Specialist Requested Reschedule", "Client Requested Reschedule"]).update_all(status: "Declined")
  end

  task generate_skill_colors: :environment do
    Skill.find_each do |skill|
      skill.__send__(:set_color)
      skill.save
    end
  end
end
