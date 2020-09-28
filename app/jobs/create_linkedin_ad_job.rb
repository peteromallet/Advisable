class CreateLinkedinAdJob < ApplicationJob
  ACCOUNT_ID = 503157292
  CAMPAIGN_GROUP_ID = 611804793
  API_ROOT = "https://api.linkedin.com".freeze
  attr_reader :project, :conversation_id, :inmail_id, :creative_id

  queue_as :default

  # Workflow: https://docs.microsoft.com/en-us/linkedin/marketing/usecases/ad-tech/conversation-ads#setting-up-a-conversation-ad
  def perform(project_id)
    @project = Project.find(project_id)

    create_campaign! if project.linkedin_campaign_id.nil?
    create_conversation!
    build_conversation_tree!
    create_ad_inmail_content!
    create_conversation_ad!
    activate_conversation_ad!
  end

  private

  def create_campaign!
    params = {
      account: "urn:li:sponsoredAccount:#{ACCOUNT_ID}",
      campaignGroup: "urn:li:sponsoredCampaignGroup:#{CAMPAIGN_GROUP_ID}",
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
    campaign_id = response.headers["x-resourceidentity-urn"].split(":").last.to_i
    project.update!(linkedin_campaign_id: campaign_id)
    puts "New campaign created: #{campaign_id}"
  end

  def create_conversation!
    params = {"parentAccount": "urn:li:sponsoredAccount:#{ACCOUNT_ID}"}
    response = linkedin_request("sponsoredConversations", params)
    @conversation_id = response.headers["x-linkedin-id"].to_i
    puts "New sponsored conversation created: #{conversation_id}"
  end

  def build_conversation_tree!
    flowchart = {
      body: "Hi %FIRSTNAME%, lalala",
      actions: [
        {
          text: "Yes",
          body: "Great, let us walk blablabla",
          actions: [
            {
              text: "Yes",
              body: "Let's start then",
              actions: [
                {
                  text: "Yes",
                  body: "Good to hear",
                  actions: [
                    {
                      text: "Yes",
                      body: "our client",
                      actions: [
                        {
                          text: "Yes",
                          body: "it seems like you could be a great fit",
                          actions: [
                            {
                              text: "Yes",
                              url: "https://advisable.com/projects/request-more-information/?pid=#{project.id}&utm_campaign=#{project.id}"
                            },
                            {
                              text: "No",
                              url: "https://advisable.com/thank-you/?text=Unfortunately%2C%20we%20don%27t%20think%20you%27re%20a%20good%20fit"
                            }
                          ]
                        },
                        {
                          text: "No",
                          url: "https://advisable.com/thank-you/?text=Unfortunately%2C%20we%20don%27t%20think%20you%27re%20a%20good%20fit"
                        }
                      ]
                    },
                    {
                      text: "No",
                      url: "https://advisable.com/thank-you/?text=Unfortunately%2C%20we%20don%27t%20think%20you%27re%20a%20good%20fit"
                    }
                  ]
                },
                {
                  text: "No",
                  url: "https://advisable.com/thank-you/?text=Unfortunately%2C%20we%20don%27t%20think%20you%27re%20a%20good%20fit"
                }
              ]
            },
            {
              text: "No",
              url: "https://advisable.com/thank-you/?text=Unfortunately%2C%20we%20don%27t%20think%20you%27re%20a%20good%20fit"
            }
          ]
        },
        {
          text: "No",
          url: "https://advisable.com/thank-you/?text=Unfortunately%2C%20we%20don%27t%20think%20you%27re%20a%20good%20fit"
        },
        {
          text: "I might know someone",
          url: "https://advisable.formstack.com/forms/performance_marketing_referral"
        }
      ]
    }
    first_message_urn = create_message!(flowchart)
    params = {patch: {"$set": {firstMessageContent: first_message_urn}}}
    response = linkedin_request("sponsoredConversations/#{conversation_id}", params, 204)
    urn = response.headers["x-resourceidentity-urn"]
    puts "First message set: #{first_message_urn}"
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
    @inmail_id = response.headers["x-linkedin-id"].to_i
    puts "New InMail content created: #{inmail_id}"
  end

  def create_conversation_ad!
    params = {
      campaign: "urn:li:sponsoredCampaign:#{project.linkedin_campaign_id}",
      variables: {data: {"com.linkedin.ads.SponsoredInMailCreativeVariables": {"content": "urn:li:adInMailContent:#{inmail_id}"}}},
      status: "DRAFT",
      type: "SPONSORED_MESSAGE"
    }
    response = linkedin_request("adCreativesV2", params)
    @creative_id = response.headers["x-linkedin-id"].to_i
    puts "New Sponsored Creative Ad created: #{creative_id}"
  end

  def activate_conversation_ad!
    params = {patch: {"$set": {status: "ACTIVE"}}}
    response = linkedin_request("adCreativesV2/#{creative_id}", params, 204)
    puts "Creative Ad ACTIVATED: #{creative_id}"
  end

  def create_message!(message)
    params = {bodySource: {text: message[:body]}}
    if message.key?(:actions)
      actions = message[:actions].map do |action|
        if action.key?(:actions)
          {
            optionText: action[:text],
            type: "SIMPLE_REPLY",
            nextContent: create_message!(action)
          }
        else
          {
            optionText: action[:text],
            type: "EXTERNAL_WEBSITE",
            actionTarget: {landingPage: action[:url]}
          }
        end
      end
      params.merge!(nextAction: {"array": actions})
    end
    response = linkedin_request("sponsoredConversations/#{conversation_id}/sponsoredMessageContents", params)
    urn = response.headers["x-resourceidentity-urn"]
    puts "New message created: #{urn}"
    urn
  end

  def linkedin_request(url, params, expected_status = 201)
    response = Faraday.post("#{API_ROOT}/v2/#{url}", params.to_json, request_headers)
    return response if response.success? && response.status == expected_status

    puts "Something went wrong. Status: #{response.status}"
    raise response.body
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
