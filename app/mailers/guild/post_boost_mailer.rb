# frozen_string_literal: true

class Guild::PostBoostMailer < ApplicationMailer
  layout 'styled_mailer'

  def new_post(post:, follower_id:)
    @follower = Specialist.find(follower_id)
    return if @follower.account.unsubscribed?("Advisable Guild")

    @guild_post = post
    @author = @guild_post.specialist
    @followed_topic_names = (@guild_post.guild_topic_list & @follower.guild_followed_topics.pluck(:name)).join(', ')

    mail(
      to: @follower.account.email,
      subject: "New Post - #{@guild_post.title}".truncate(80)
    )
  end
end
