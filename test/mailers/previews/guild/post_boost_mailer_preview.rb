# frozen_string_literal: true

module Guild
  class PostBoostMailerPreview < ActionMailer::Preview
    # http://localhost:3000/rails/mailers/guild/post_boost_mailer/new_post
    def new_post
      post = Guild::Post.first
      subscriber = Specialist.first
      post.labels.each { |l| subscriber.subscribe_to!(l) }

      Guild::PostBoostMailer.new_post(post:, subscriber_id: subscriber.id)
    end
  end
end
