# frozen_string_literal: true

module Guild
  class PostBoostMailerPreview < ActionMailer::Preview
    # http://localhost:3000/rails/mailers/guild/post_boost_mailer/new_post
    def new_post
      post = Guild::Post.first
      subscriber = Specialist.first
      post.guild_topics.each { |gt| subscriber.subscribe_to!(gt) }

      Guild::PostBoostMailer.new_post(post: post, subscriber_id: subscriber.id)
    end
  end
end
