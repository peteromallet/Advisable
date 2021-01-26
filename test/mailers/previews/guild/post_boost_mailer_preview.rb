class Guild::PostBoostMailerPreview < ActionMailer::Preview
  # http://localhost:3000/rails/mailers/guild/post_boost_mailer/new_post
  def new_post
    post = Guild::Post.first
    follower = Specialist.first
    post.guild_topics.each { |gt| follower.follow(gt) }

    Guild::PostBoostMailer.new_post(post: post, follower_id: follower.id)
  end
end
