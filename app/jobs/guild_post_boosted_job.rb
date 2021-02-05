# frozen_string_literal: true

class GuildPostBoostedJob < ApplicationJob
  def perform(post_id)
    post = Guild::Post.find(post_id)
    follower_ids = Follow.where(followable_id: post.guild_topics, followable_type: "ActsAsTaggableOn::Tag").
      where.not(follower: post.specialist).
      distinct.pluck(:follower_id)

    # Send a boosted mailer to each *specialist*
    follower_ids.each do |id|
      Guild::PostBoostMailer.new_post(post: post, follower_id: id).deliver_later
    end

    # Create a Notification for each *account*
    accounts = Account.joins(:specialist).where("specialists.id" => follower_ids)
    accounts.each do |account|
      Notification.create!(
        account: account,
        action: "suggested_post",
        notifiable: post
      )
    end
  end
end
