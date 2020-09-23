module SpecialistHelper
  def specialist_unsubscribe_url(specialist)
    "#{root_host}/unsubscribe?Specialist%20ID=#{specialist.uid}&field66878840=#{specialist.email}"
  end

  def specialist_update_skills_url(specialist)
    "#{root_host}/update-skills?sid=#{specialist.uid}&skill=#{ERB::Util.url_encode(specialist.skills.pluck(:name).join(', '))}"
  end

  # TODO: link to the new flow that uses the applyForProject mutation
  def specialist_request_invite_url(specialist, project)
    "#{root_host}/request-project-invitation?pid=#{project.uid}&utm_campaign=#{project.uid}&skill=#{project.primary_skill.name}"
  end

  private

  def root_host
    if Rails.env.production?
      'https://advisable.com'
    else
      ActionMailer::Base.default_url_options[:host]
    end
  end
end
