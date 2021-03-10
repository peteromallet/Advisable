# frozen_string_literal: true

module Guild
  class PostBoostMailer < ApplicationMailer
    def new_post(post:, subscriber_id:)
      @subscriber = Specialist.find(subscriber_id)
      return if @subscriber.account.unsubscribed?("Advisable Guild")

      @guild_post = post
      @author = @guild_post.specialist
      subscribed_topic_names = Guild::Topic.where(id: @subscriber.subscriptions.pluck(:tag_id)).pluck(:name)
      @followed_topic_names = (@guild_post.guild_topic_list & subscribed_topic_names).join(', ')

      mail(
        to: @subscriber.account.email,
        subject: "New Post - #{@guild_post.title}".truncate(80)
      )
    end
  end
end
