class Chat::FriendlyNameService < ApplicationService
  attr_reader :identity, :channel_sid

  def initialize(identity:, channel_sid:)
    @identity = identity
    @channel_sid = channel_sid
  end

  def call
    client = TwilioChat::Client.new(channel_sid: channel_sid, identity: identity)
    client.check_membership
    client.update_friendly_name!
  rescue Twilio::REST::RestError
    raise Service::Error.new("participant is not a member of the channel")
  end
end