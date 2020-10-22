class WebhooksController < ApplicationController
  skip_before_action :verify_authenticity_token

  # https://www.twilio.com/docs/chat/webhook-events#webhook-bodies
  # This webhook sends an email notification for any new messages
  # for an **existing conversation**.  Notifications are only
  # sent out if the user isnt actively logged into the Guild or they
  # havent checked their new messages within the app.
  #
  # NOTE: There are no webhooks sent from Twilio for the beginning of a direct message.

  def twilio_chat
    ary = URI.decode_www_form(request.body.read)
    webhook = Hash[ary]

    if webhook["AccountSid"] != ENV.fetch('TWILIO_SID')
      render(json: {}, status: :unauthorized) && return
    end

    if webhook["EventType"] == "onMessageSent"
      client = TwilioChat::Client.new(identity: webhook["ClientIdentity"], channel_sid: webhook["ChannelSid"])
      client.check_membership

      # Get the twilio resource for the intended recipient of the message
      other = client.fetch_other_participant

      # Send an email notification if:
      #  a. the user isn't logged into the guild
      #  b. the user hasnt checked their new messages within the app
      unless other.is_online
        Guild::ChatMailer.new_message(
          recipient_uid: other.identity,
          sender_uid: client.identity,
          channel_sid: webhook["ChannelSid"],
          message_body: webhook["Body"]
        ).deliver_later
      end
    end
  rescue StandardError => e
    Rails.logger.error("Error with TwilioChat webhook #{e.message}")
  end
end
