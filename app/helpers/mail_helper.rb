module MailHelper
  def specialist_unsubscribe_url(specialist)
    "#{root_host}/unsubscribe?Specialist%20ID=#{specialist.uid}&field66878840=#{specialist.email}"
  end

  def specialist_update_skills_url(specialist)
    "#{root_host}/update-skills?sid=#{specialist.uid}&skill=#{ERB::Util.url_encode(specialist.skills.pluck(:name).join(', '))}"
  end

  def specialist_project_application_url(specialist, project)
    "#{app_host}/opportunities/#{project.uid}?utm_campaign=#{project.uid}"
  end

  def time_in_zone(timestamp, zone, format = "%d %B, %I:%M%P %Z")
    timestamp.in_time_zone(zone).strftime(format)
  end

  private

  def root_host
    'https://advisable.com'
  end

  def app_host
    if Rails.env.production?
      'https://app.advisable.com'
    else
      ActionMailer::Base.default_url_options[:host]
    end
  end
end
