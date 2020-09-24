class CreateLinkedinAdJob < ApplicationJob
  ACCOUNT_ID = 503157292
  API_ROOT = "https://api.linkedin.com".freeze
  attr_reader :project

  queue_as :default

  # Workflow: https://docs.microsoft.com/en-us/linkedin/marketing/usecases/ad-tech/conversation-ads#setting-up-a-conversation-ad
  def perform(project_id)
    @project = Project.find(project_id)

    create_campaign! if project.linkedin_campaign_id.nil?
    create_conversation! # remember urn
    build_conversation_tree!
    set_first_message!
    create_conversation_ad!
  end

  private

  def create_campaign!
    # Still need to figure out if we need one or multiple campaign groups
    campaign_group_id = 611804793
    params = {
      account: "urn:li:sponsoredAccount:#{ACCOUNT_ID}",
      campaignGroup: "urn:li:sponsoredCampaignGroup:#{campaign_group_id}",
      creativeSelection: "ROUND_ROBIN",
      locale: {country: "US", language: "en"},
      name: "#{project.name} | #{project.airtable_id}",
      runSchedule: {start: Date.today.midnight.to_i},
      type: "SPONSORED_INMAILS",
      objectiveType: "WEBSITE_VISIT",
      status: "DRAFT"
    }

    response = Faraday.post("#{API_ROOT}/v2/adCampaignsV2", params.to_json, request_headers)

    if response.status == 201
      campaign_id = response.headers["x-resourceidentity-urn"].split(":").last.to_i
      project.update!(linkedin_campaign_id: campaign_id)
      "New campaign created: #{campaign_id}"
    else
      pp JSON[response.body]
    end
  end

  def create_conversation!
    # content goes here
    # remember urn
  end

  def build_conversation_tree!
    # content goes here
  end

  def set_first_message!
    # content goes here
  end

  def create_conversation_ad!
    # content goes here
  end

  # Store tokens on User and add refresh_token logic
  # https://docs.microsoft.com/en-us/linkedin/shared/authentication/programmatic-refresh-tokens
  def request_headers
    {
      "Connection" => "Keep-Alive",
      "Authorization" => "Bearer #{ENV['LINKEDIN_TOKEN']}",
      "Content-Type" => "application/json",
      "Accept" => "application/json"
    }
  end
end
