# rubocop:disable all
# Usage:
# $> rake db:seed:02_guild_seeds

require "faker"

Rails.logger.info "Creating guild topics"

# TODO: AATO - Remove topic stuff
# Potentially move to Label.insert_all to speed this up

# Need this because ActsAsTaggableOn does some magic 🤷‍♂️
Guild::Topic.reset_column_information

current_time = Time.zone.now
Skill.where(active: true, original: nil).find_each do |skill|
  Label.create(name: skill.name, skill: skill, published_at: current_time)
  Guild::Topic.create(name: skill.name, topicable: skill, published: true)
end

Industry.active.order(name: :asc).find_each do |industry|
  Label.create(name: industry.name, industry: industry, published_at: current_time)
  Guild::Topic.create(name: industry.name, topicable: industry, published: true)
end

Country.find_each do |country|
  Label.create(name: country.name, country: country, published_at: current_time)
  Guild::Topic.create(name: country.name, topicable: country, published: true)
end

Rails.logger.info "Creating guild posts"

def random_post_type
  Guild::Post::POST_TYPES.sample
end

def random_specialist
  raise "Requires at least one Specialist" if Specialist.none?

  Specialist.order(Arel.sql("RANDOM()")).first
end

Specialist.update_all(guild: true)

5.times do |num|
  body = Faker::Lorem.paragraph_by_chars(number: 256, supplemental: false)
  post = Guild::Post.new(
    specialist: random_specialist,
    title: Faker::Quote.yoda[0..149],
    body: body,
    type: random_post_type,
    status: "published",
    audience_type: "none"
  )

  if Guild::Topic.any?
    post.guild_topic_list << Guild::Topic.offset(rand(Guild::Topic.count)).first.name
  end

  post.labels << Label.order("RANDOM()").first

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

Rails.logger.info "Creating guild events"

10.times do |num|
  host = Specialist.order(Arel.sql("RANDOM()")).first
  starts_at = rand(1..10).days.from_now
  event = Guild::Event.create(
    host: host, 
    title: Faker::Quote.yoda[0..149], 
    description: Faker::Lorem.paragraph_by_chars(number: 4256, supplemental: false),
    published: true,
    starts_at: starts_at,
    ends_at: starts_at + 1.hour
  )

  rand(1..10).times do 
    attendee = Specialist.where.not(id: host.id).order(Arel.sql("RANDOM()")).first
    event.event_attendees.create(attendee: attendee) unless event.attendees.exists?(attendee.id)
  end

  # Attach random picsum image without being rate limited
  sleep(0.3)
  file = URI.open('https://picsum.photos/1800/1800.jpg')
  event.cover_photo.attach(io: file, filename: "cover.jpg", content_type: 'image/jpg')
  event.save!
end

# rubocop:enable all
