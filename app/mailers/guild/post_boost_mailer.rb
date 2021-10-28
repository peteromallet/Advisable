# frozen_string_literal: true

module Guild
  class PostBoostMailer < ApplicationMailer
    def new_post(post:, subscriber_id:)
      @subscriber = Specialist.find(subscriber_id)
      return if @subscriber.account.unsubscribed?("Advisable Guild")

      @guild_post = post
      @author = @guild_post.specialist
      subscriber_label_names = @subscriber.subscribed_labels.pluck(:name)
      post_label_names = @guild_post.labels.pluck(:name)
      @label_names = (post_label_names & subscriber_label_names).join(", ")

      mail(
        to: @subscriber.account.email,
        subject: "New Post - #{@guild_post.title}".truncate(80)
      )
    end
  end
end
