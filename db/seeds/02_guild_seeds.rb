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

5.times do
  body = Faker::Lorem.paragraph_by_chars(number: 256, supplemental: false)
  post = Guild::Post.new(
    specialist: random_specialist,
    title: Faker::Quote.yoda[0..149],
    body: body,
    body_raw: %x{ node #{Rails.root.join('lib/scripts/node', 'convertForDraftJS.js').to_s} #{body} },
    type: random_post_type
  )
  post.save!

  rand(3).times do
    post.reactions.create(specialist: random_specialist)
  end

  parent_comment = post.comments.build(
    specialist: random_specialist,
    body: Faker::Lorem.paragraph_by_chars(number: 256, supplemental: false),
  )
  parent_comment.save!

  rand(2).times do
    parent_comment.reload.child_comments.create!(
      body: Faker::Lorem.paragraph_by_chars(number: 100, supplemental: false),
      specialist: random_specialist, post: parent_comment.post
    )
  end
end