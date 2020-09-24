class CreateLinkedinCampaignJob < ApplicationJob
  queue_as :default

  def perform(project_id)
    project = Project.find(project_id)
    puts project.goals

    response = Faraday.post('https://api.linkedin.com/v2/adCampaignsV2') do |_req|
      r
    end
  end
end
