class Guild::PostBoostMailer < ApplicationMailer
  layout 'styled_mailer'

  def new_post(post:, follower_id:)
    @guild_post = post
    @follower = Specialist.find(follower_id)
    @author = @guild_post.specialist
    @followed_topic_names = (@guild_post.guild_topic_list & @follower.guild_followed_topics.pluck(:name)).join(', ')

    # Default if there is no avatar
    attachments.inline["avatar.png"] = File.read(Rails.root.join('app/views/guild/post_boost_mailer/assets/avatar.png').to_s)

    mail(
      to: @follower.account.email,
      subject: "New Post - #{@guild_post.title}".truncate(80)
    )
  end
end
