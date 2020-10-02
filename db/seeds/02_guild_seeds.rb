# Usage:
# $> rake db:seed:02_guild_seeds

require "faker"

puts "Creating guild posts"

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
    body_raw: %x{node #{Rails.root.join('lib/scripts/node', 'convertForDraftJS.js').to_s} #{body}},
    type: random_post_type
  )

  if Guild::Topic.any?
    post.guild_topic_list << Guild::Topic.offset(rand(Guild::Topic.count)).first.name
  end

  post.save!

  rand(3).times do
    post.reactions.create(specialist: random_specialist)
  end

  parent_comment = post.comments.build(
    specialist: random_specialist,
    body: Faker::Lorem.paragraph_by_chars(number: 256, supplemental: false),
  )
  parent_comment.save!

  # rand(2).times do
  #   parent_comment.reload.child_comments.create!(
  #     body: Faker::Lorem.paragraph_by_chars(number: 100, supplemental: false),
  #     specialist: random_specialist, post: parent_comment.post
  #   )
  # end

  next unless num == 1
  puts "Attaching a cover image"
  cover_image = File.join(Rails.root, 'db/seeds/assets/guild/cover.jpg')
  post.cover_image.attach(io: File.open(cover_image), filename: 'cover.jpg', content_type: 'image/jpeg')
end