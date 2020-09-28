class CreateLinkedinAdJob < ApplicationJob
  ACCOUNT_ID = 503157292
  API_ROOT = "https://api.linkedin.com".freeze
  attr_reader :project, :conversation_id, :inmail_id

  queue_as :default

  # Workflow: https://docs.microsoft.com/en-us/linkedin/marketing/usecases/ad-tech/conversation-ads#setting-up-a-conversation-ad
  def perform(project_id)
    @project = Project.find(project_id)

    create_campaign! if project.linkedin_campaign_id.nil?
    create_conversation!
    build_conversation_tree!
    create_ad_inmail_content!
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
      runSchedule: {start: Date.tomorrow.midnight.to_i * 1000},
      type: "SPONSORED_INMAILS",
      objectiveType: "WEBSITE_VISIT",
      totalBudget: {amount: "100", currencyCode: "EUR"},
      status: "DRAFT"
    }

    response = linkedin_request("adCampaignsV2", params)
    if response.status == 201
      campaign_id = response.headers["x-resourceidentity-urn"].split(":").last.to_i
      project.update!(linkedin_campaign_id: campaign_id)
      puts "New campaign created: #{campaign_id}"
    else
      puts "Something went wrong. Status: #{response.status}"
    end
  end

  def create_conversation!
    params = {"parentAccount": "urn:li:sponsoredAccount:#{ACCOUNT_ID}"}
    response = linkedin_request("sponsoredConversations", params)

    if response.status == 201
      @conversation_id = response.headers["x-linkedin-id"].to_i
      puts "New sponsored conversation created: #{conversation_id}"
    else
      puts "Something went wrong. Status: #{response.status}"
    end
  end

  def build_conversation_tree!
    flowchart = {
      body: "Hey buddy",
      actions: [
        # {
        #   body: "Yes",
        #   message:{body: "You answered yes!"}
        # },
        {text: "No", action: "EXTERNAL_WEBSITE", url: "https://advisable.com/thank-you/?text=Unfortunately%2C%20we%20don%27t%20think%20you%27re%20a%20good%20fit"},
        {text: "I might know someone", url: "https://advisable.formstack.com/forms/performance_marketing_referral"}
      ]
    }

    first_message_urn = create_message(flowchart)
    params = {patch: {"$set": {firstMessageContent: first_message_urn}}}
    response = linkedin_request("sponsoredConversations/#{conversation_id}", params)
    if response.status == 204
      urn = response.headers["x-resourceidentity-urn"]
      puts "First message set: #{first_message_urn}"
    else
      raise "Something went wrong. Status: #{response.status}"
    end
  end

  def create_ad_inmail_content!
    params = {
        account: "urn:li:sponsoredAccount:#{ACCOUNT_ID}",
        name: "#{project.name} | #{project.airtable_id}",
        htmlBody: "<p>123<br><br>456</p>",
        subContent: {"com.linkedin.ads.AdInMailGuidedRepliesSubContent": {sponsoredConversation: "urn:li:sponsoredConversation:#{conversation_id}"}},
        subject: "Hey, y'all",
        sender: {
          displayName: "Miha Rekar",
          displayPictureV2: "urn:li:digitalmediaAsset:C4D03AQFKjyztLrj3AA",
          from: "urn:li:person:BbGVRJBPf7"
      }
    }
    response = linkedin_request("adInMailContentsV2", params)

    if response.status == 201
      @inmail_id = response.headers["x-linkedin-id"].to_i
      puts "New InMail content created: #{inmail_id}"
    else
      raise "Something went wrong. Status: #{response.status}"
    end
  end

  def create_conversation_ad!
    params = {
      campaign: "urn:li:sponsoredCampaign:#{project.linkedin_campaign_id}",
      variables: {data: {"com.linkedin.ads.SponsoredInMailCreativeVariables": {"content": "urn:li:adInMailContent:#{inmail_id}"}}},
      status: "DRAFT",
      type: "SPONSORED_MESSAGE"
    }

    response = linkedin_request("adCreativesV2", params)

    # I GET 403 here

    if response.status == 201
      @inmail_id = response.headers["x-linkedin-id"].to_i
      puts "New InMail content created: #{inmail_id}"
    else
      raise "Something went wrong. Status: #{response.status}"
    end
  end

  def create_message(message)
    if message.key?(:actions)
      actions = message[:actions].map do |action|
        if action.key?(:message)
          # TODO: figure this out
          create_message(message)
        else
          {
            optionText: action[:text],
            type: "EXTERNAL_WEBSITE",
            actionTarget: {landingPage: action[:url]}
          }
        end
      end
    end

    params = {
      bodySource: {text: message[:body]},
      nextAction: {"array": actions}
    }
    response = linkedin_request("sponsoredConversations/#{conversation_id}/sponsoredMessageContents", params)

    if response.status == 201
      urn = response.headers["x-resourceidentity-urn"]
      puts "New message created: #{urn}"
      return urn
    else
      raise "Something went wrong. Status: #{response.status}"
    end
  end

  def linkedin_request(url, params)
    response = Faraday.post("#{API_ROOT}/v2/#{url}", params.to_json, request_headers)
    pp JSON[response.body] unless response.success?
    response
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
