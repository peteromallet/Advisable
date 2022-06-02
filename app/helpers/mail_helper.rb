# frozen_string_literal: true

module MailHelper
  include MagicLinkHelper

  def specialist_unsubscribe_url(specialist)
    "#{root_host}/unsubscribe?Specialist%20ID=#{specialist.uid}&field66878840=#{specialist.account.email}"
  end

  def specialist_update_skills_url(specialist)
    "#{root_host}/update-skills?sid=#{specialist.uid}&skill=#{ERB::Util.url_encode(specialist.skills.pluck(:name).join(', '))}"
  end

  def magic_link_manage_guild_follows(account)
    magic_link(account, "#{app_host}/guild/follows", expires_at: 1.day.from_now)
  end

  def magic_link_guild_post(guild_post, account)
    url = "#{app_host}/posts/#{guild_post.id}"
    guild_post.shareable ? url : magic_link(account, url, expires_at: 1.day.from_now)
  end

  def case_study_url(article)
    "#{app_host}/articles/#{article.slug_or_uid}"
  end

  def conversation_url(conversation)
    "#{app_host}/messages/#{conversation.uid}"
  end

  def profile_url(specialist)
    "#{app_host}/profile/#{specialist.uid}"
  end

  def call_url(video_call)
    "#{app_host}/calls/#{video_call.uid}"
  end

  def payment_request_url(payment_request)
    "#{app_host}/payment_requests/#{payment_request.uid}"
  end

  def settings_url
    "#{app_host}/settings/availability"
  end

  def interview_request_url(conversation)
    "#{app_host}/messages/#{conversation.uid}"
  end

  def time_in_zone(timestamp, zone, format = "%d %B, %I:%M%P %Z")
    timestamp.in_time_zone(zone).strftime(format)
  end

  def set_password_url
    app_host
  end

  def manage_subscriptions_url
    "#{app_host}/settings/notifications"
  end

  def possesive(name)
    name.end_with?("s") ? "#{name}'" : "#{name}'s"
  end

  def pretty_iso(timestamp)
    return if timestamp.nil?

    DateTime.parse(timestamp).strftime("%d %B, %I:%M%P %Z")
  end

  def payment_requests_url
    "#{app_host}/payment_requests"
  end

  def interview_url(interview)
    "#{app_host}/interviews/#{interview.uid}"
  end

  def root_host
    "https://advisable.com"
  end

  def app_host
    heroku_name = ENV.fetch("HEROKU_APP_NAME", nil)
    if heroku_name.present? && heroku_name != "advisable"
      "https://#{heroku_name}.herokuapp.com"
    elsif Rails.env.production?
      "https://app.advisable.com"
    else
      ActionMailer::Base.default_url_options[:host]
    end
  end
end
