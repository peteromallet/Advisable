# frozen_string_literal: true

# rubocop:disable Rails/SkipsModelValidations

# Usage:
# $> rake db:seed:02_guild_seeds

require "faker"
require "open-uri"

Rails.logger.info "Creating labels"

current_time = Time.zone.now
Skill.where(active: true).find_each do |skill|
  Label.create(name: skill.name, skill: skill, published_at: current_time)
end

Industry.active.order(name: :asc).find_each do |industry|
  Label.create(name: industry.name, industry: industry, published_at: current_time)
end

Country.find_each do |country|
  Label.create(name: country.name, country: country, published_at: current_time)
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

10.times do |_num|
  host = Specialist.order(Arel.sql("RANDOM()")).first
  starts_at = rand(5..90).days.from_now
  event = Event.create(
    host: host,
    title: Faker::Quote.yoda[0..149],
    description: Faker::Lorem.paragraph_by_chars(number: 4256, supplemental: false),
    published_at: Time.zone.now,
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

label = Label.last
label.update!(description: "This is a label description")
PostPrompt.create!(
  featured: true,
  label: label,
  prompt: "Please edit this text and add something *interesting*",
  prompt_cta: "Click me"
)

# rubocop:enable Rails/SkipsModelValidations
