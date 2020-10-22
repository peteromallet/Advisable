class CreateLinkedinAdJob < ApplicationJob
  ACCOUNT_ID = 503157292
  CAMPAIGN_GROUP_ID = 612029303
  CONVERSION_ID = 2659460 # Generic Thank You

  attr_reader :project, :api, :conversation_id, :first_message_urn, :inmail_id, :creative_id

  queue_as :default

  # Workflow: https://docs.microsoft.com/en-us/linkedin/marketing/usecases/ad-tech/conversation-ads#setting-up-a-conversation-ad
  def perform(project)
    @project = project
    @api = LinkedinApi.new

    create_campaign!
    create_conversation!
    build_message_flowchart!
    set_first_message!
    create_ad_inmail_content!
    create_conversation_ad!
    activate_conversation_ad!
    create_campaign_conversion!
    activate_campaign!
    pause_campaign!
  rescue ActiveRecord::RecordNotFound
    Rails.logger.error("You need to Set Up LinkedIn Ads in Admin!")
  rescue LinkedinApi::RequestError => e
    # Do not retry jobs that fail LinkedIn API calls just log to Sentry
    Raven.capture_message(e.response_log.take(2).join(" "), backtrace: e.backtrace, extra: {response: e.response_log.to_json, project_airtable_id: project.airtable_id})
    Slack.message(channel: "paid_marketing", text: "LinkedIn API job posting *failed* for #{project.name} (##{project.airtable_id})!")
  end

  private

  def create_campaign!
    return if project.linkedin_campaign_id.present?
    params = {
      account: "urn:li:sponsoredAccount:#{ACCOUNT_ID}",
      campaignGroup: "urn:li:sponsoredCampaignGroup:#{CAMPAIGN_GROUP_ID}",
      creativeSelection: "ROUND_ROBIN",
      locale: {country: "US", language: "en"},
      name: "#{project.name} | #{project.airtable_id}",
      runSchedule: {start: Date.tomorrow.midnight.to_i * 1000},
      type: "SPONSORED_INMAILS",
      unitCost: {amount: "0.15", currencyCode: "EUR"},
      objectiveType: "WEBSITE_VISIT",
      totalBudget: {amount: "100", currencyCode: "EUR"},
      status: "DRAFT"
    }
    response = api.post_request("adCampaignsV2", params)
    campaign_id = response.headers["x-resourceidentity-urn"].split(":").last.to_i
    project.update!(linkedin_campaign_id: campaign_id)
    Rails.logger.info("New campaign created: #{campaign_id}")
  end

  def create_conversation!
    params = {"parentAccount": "urn:li:sponsoredAccount:#{ACCOUNT_ID}"}
    response = api.post_request("sponsoredConversations", params)
    @conversation_id = response.headers["x-linkedin-id"].to_i
    Rails.logger.info("New sponsored conversation created: #{conversation_id}")
  end

  def build_message_flowchart!
    flowchart = LinkedinMessageCreator.new(project, "Alexandra").flowchart
    @first_message_urn = create_message!(flowchart)
  end

  def set_first_message!
    params = {patch: {"$set": {firstMessageContent: first_message_urn}}}
    response = api.post_request_with_retries("sponsoredConversations/#{conversation_id}", params, expected_status: 204)
    urn = response.headers["x-resourceidentity-urn"]
    Rails.logger.info("First message set: #{first_message_urn}")
  end

  def create_ad_inmail_content!
    params = {
        account: "urn:li:sponsoredAccount:#{ACCOUNT_ID}",
        name: "#{project.name} | #{project.airtable_id}",
        htmlBody: "In Mail",
        subContent: {"com.linkedin.ads.AdInMailGuidedRepliesSubContent": {sponsoredConversation: "urn:li:sponsoredConversation:#{conversation_id}"}},
        subject: "#{project.primary_skill&.name} Project With #{project.industry} #{project.company_type}".truncate(60),
        sender: {
          displayName: "Alexandra Ponomareva",
          displayPictureV2: "urn:li:digitalmediaAsset:C5603AQEOBKwTNiLKgg",
          from: "urn:li:person:2TsTW-IKX3"
      }
    }
    response = api.post_request_with_retries("adInMailContentsV2", params)
    @inmail_id = response.headers["x-linkedin-id"].to_i
    Rails.logger.info("New InMail content created: #{inmail_id}")
  end

  def create_conversation_ad!
    params = {
      campaign: "urn:li:sponsoredCampaign:#{project.linkedin_campaign_id}",
      variables: {data: {"com.linkedin.ads.SponsoredInMailCreativeVariables": {"content": "urn:li:adInMailContent:#{inmail_id}"}}},
      status: "DRAFT",
      type: "SPONSORED_MESSAGE"
    }
    response = api.post_request_with_retries("adCreativesV2", params)
    @creative_id = response.headers["x-linkedin-id"].to_i
    Rails.logger.info("New Sponsored Creative Ad created: #{creative_id}")
  end

  def activate_conversation_ad!
    params = {patch: {"$set": {status: "ACTIVE"}}}
    response = api.post_request("adCreativesV2/#{creative_id}", params, expected_status: 204)
    Rails.logger.info("Creative Ad ACTIVATED: #{creative_id}")
  end

  def create_campaign_conversion!
    params = {
      campaign: "urn:li:sponsoredCampaign:#{project.linkedin_campaign_id}",
      conversion: "urn:lla:llaPartnerConversion:#{CONVERSION_ID}"
    }
    path = "campaignConversions/(campaign:#{CGI.escape(params[:campaign])},conversion:#{CGI.escape(params[:conversion])})"
    response = api.put_request(path, params)
    Rails.logger.info("New Sponsored Creative Ad created: #{creative_id}")
  end

  def activate_campaign!
    params = {patch: {"$set": {status: "ACTIVE"}}}
    response = api.post_request("adCampaignsV2/#{project.linkedin_campaign_id}", params, expected_status: 204)
    Rails.logger.info("Campaign ACTIVATED: #{project.linkedin_campaign_id}")
  end

  def pause_campaign!
    params = {patch: {"$set": {status: "PAUSED"}}}
    response = api.post_request("adCampaignsV2/#{project.linkedin_campaign_id}", params, expected_status: 204)
    Rails.logger.info("Campaign PAUSED: #{project.linkedin_campaign_id}")
  end

  def create_message!(message)
    params = {bodySource: {text: message[:body]}}
    if message.key?(:actions)
      actions = message[:actions].map do |action|
        if action.key?(:actions)
          {optionText: action[:text], type: "SIMPLE_REPLY", nextContent: create_message!(action)}
        else
          {optionText: action[:text], type: "EXTERNAL_WEBSITE", actionTarget: {landingPage: action[:url]}}
        end
      end
      params[:nextAction] = {"array": actions}
    end
    response = api.post_request_with_retries("sponsoredConversations/#{conversation_id}/sponsoredMessageContents", params)
    urn = response.headers["x-resourceidentity-urn"]
    Rails.logger.info("New message created: #{urn}")
    urn
  end
end
