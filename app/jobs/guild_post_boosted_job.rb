class GuildPostBoostedJob < ApplicationJob
  def perform(guild_post_id)
    guild_post = Guild::Post.find(guild_post_id)
    follows = Follow.where(followable_id: guild_post.guild_topics, followable_type: "ActsAsTaggableOn::Tag").select("DISTINCT follower_id")
    follows.each do |follow|
      Guild::PostBoostMailer.new_post(
        guild_post_id: guild_post_id,
        follower_id: follow.follower_id
      ).deliver_later
    end
  end
end
