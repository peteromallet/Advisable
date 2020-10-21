# Usage:
# $> rake db:seed:02_guild_seeds

require "faker"

Rails.logger.info "Creating guild posts"

def random_post_type
  Guild::Post::POST_TYPES.sample
end

def random_specialist
  raise "Requires at least one Specialist" if Specialist.none?

  Specialist.order(Arel.sql("RANDOM()")).first
end

5.times do |num|
  body = Faker::Lorem.paragraph_by_chars(number: 256, supplemental: false)
  post = Guild::Post.new(
    specialist: random_specialist,
    title: Faker::Quote.yoda[0..149],
    body: body,
    type: random_post_type,
    status: "published"
  )

  if Guild::Topic.any?
    post.guild_topic_list << Guild::Topic.offset(rand(Guild::Topic.count)).first.name
  end

  post.save!

  rand(3).times do
    post.reactions.create(specialist: random_specialist)
  end

  next unless num == 1

  Rails.logger.info "Attaching an image"
  image = Rails.root.join(Rails.root, 'db/seeds/assets/guild/cover.jpg')
  gpi = Guild::PostImage.create(post: post, cover: true, position: 0)
  gpi.image.attach(io: File.open(image), filename: 'cover.jpg', content_type: 'image/jpeg')
  gpi.save
end
