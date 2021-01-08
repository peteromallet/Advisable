class GuildPostBoostedJob < ApplicationJob
  def perform(post_id)
    post = Guild::Post.find(post_id)
    follower_ids = Follow.where(followable_id: post.guild_topics, followable_type: "ActsAsTaggableOn::Tag").distinct.pluck(:follower_id)
    follower_ids.each do |id|
      Guild::PostBoostMailer.new_post(post: post, follower_id: id).deliver_later
    end
  end
end
