#
# This webhook sends an email notification for any new messages
# for an **existing conversation**.  Notifications are only
# sent out if the user isnt actively logged into the Guild or they
# havent checked their new messages within the app.
#
# NOTE: There are no webhooks sent from Twilio for the beginning of a direct message.

class WebhooksController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  # https://www.twilio.com/docs/chat/webhook-events#webhook-bodies
  def twilio_chat
    ary = URI.decode_www_form(request.body.read)
    webhook = Hash[ary]

    if webhook["InstanceSid"] != ENV.fetch('TWILIO_CHAT_ACCOUNT_SID')
      render json: {}, status: :unauthorized and return false
    end

    if webhook["EventType"] == "onMessageSent"
      client = TwilioChat::Client.new(identity: webhook["ClientIdentity"], channel_sid: webhook["ChannelSid"])
      client.check_membership

      # Find the intended recipient of the message
      channel_member_uids = JSON.parse(client.channel.attributes)["members"]&.values
      other_uid = channel_member_uids.find { |uid| uid != client.identity }
      other = client.chat_service.users(other_uid).fetch

      # Send an email notification if:
      #  a. the user isn't logged into the guild
      #  b. the user hasnt checked their new messages within the app
      unless other.is_online
        Guild::ChatMailer.new_message(
          recipient_uid: other_uid,
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

# Example webhook for "onMessageSent"
# {
# 	"EventType"=>"onMessageSent",
# 	"InstanceSid"=>"ISd6fab8af48ae4b02af29cc011b0af400",
# 	"Attributes"=>"{}",
# 	"DateCreated"=>"2020-10-07T22:16:34.757Z",
# 	"Index"=>"2",
# 	"From"=>"spe_YICC8Qd9IOFfaYn",
# 	"MessageSid"=>"IM88589c1b329e4967b8343e4cc2d75038",
# 	"AccountSid"=>"ACa5185636e0ed54c2b82f93b95aab64fe",
# 	"Source"=>"SDK",
# 	"ChannelSid"=>"CHce4469f963284efba01b2dc168319d73",
# 	"ClientIdentity"=>"spe_YICC8Qd9IOFfaYn",
# 	"RetryCount"=>"0",
# 	"Body"=>"this is a test"
# }
