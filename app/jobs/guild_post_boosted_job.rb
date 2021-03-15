# frozen_string_literal: true

class GuildPostBoostedJob < ApplicationJob
  def perform(post_id)
    post = Guild::Post.find(post_id)
    tag_ids = post.guild_topics.pluck(:id)
    subscriber_ids = Subscription.where(tag_id: tag_ids).where.not(specialist_id: post.specialist_id).distinct.pluck(:specialist_id)

    subscriber_ids.each do |id|
      Guild::PostBoostMailer.new_post(post: post, subscriber_id: id).deliver_later
    end

    Account.joins(:specialist).where("specialists.id" => subscriber_ids).each do |account|
      Notification.create!(account: account, action: "suggested_post", notifiable: post)
    end
  end
end
