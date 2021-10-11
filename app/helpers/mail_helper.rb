# frozen_string_literal: true

module MailHelper
  include MagicLinkHelper

  def specialist_unsubscribe_url(specialist)
    "#{root_host}/unsubscribe?Specialist%20ID=#{specialist.uid}&field66878840=#{specialist.account.email}"
  end

  def specialist_update_skills_url(specialist)
    "#{root_host}/update-skills?sid=#{specialist.uid}&skill=#{ERB::Util.url_encode(specialist.skills.pluck(:name).join(', '))}"
  end

  def specialist_project_application_url(project)
    "#{app_host}/opportunities/#{project.uid}?utm_campaign=#{project.uid}"
  end

  def magic_link_manage_guild_follows(account)
    magic_link(account, "#{app_host}/guild/follows", expires_at: 1.day.from_now)
  end

  def magic_link_guild_post(guild_post, account)
    url = "#{app_host}/guild/posts/#{guild_post.id}"
    guild_post.shareable ? url : magic_link(account, url, expires_at: 1.day.from_now)
  end

  def case_study_url(search, article)
    "#{app_host}/explore/#{search.uid}/#{article.uid}"
  end

  def conversation_url(conversation)
    "#{app_host}/messages/#{conversation.uid}"
  end

  def time_in_zone(timestamp, zone, format = "%d %B, %I:%M%P %Z")
    timestamp.in_time_zone(zone).strftime(format)
  end

  def set_password_url
    "#{app_host}/set_password"
  end

  def manage_subscriptions_url(account)
    if account.user.present?
      "https://advisable.com/client-contact-unsubscribe/?cid=#{account.user.uid}"
    else
      "https://advisable.com/unsubscribe?Specialist%20ID=#{account.specialist.uid}"
    end
  end

  private

  def root_host
    'https://advisable.com'
  end

  def app_host
    heroku_name = ENV["HEROKU_APP_NAME"]
    if heroku_name.present? && heroku_name != "advisable"
      "https://#{heroku_name}.herokuapp.com"
    elsif Rails.env.production?
      'https://app.advisable.com'
    else
      ActionMailer::Base.default_url_options[:host]
    end
  end
end
