# frozen_string_literal: true

FactoryBot.define do
  factory :guild_post, class: "Guild::Post" do
    title    { Faker::Quote.yoda[0..149] }
    body     { Faker::Lorem.paragraph_by_chars(number: 256, supplemental: false) }
    status   { Guild::Post.statuses["published"] }
    specialist
  end

  factory :advice_required_guild_post, parent: :guild_post, class: "Guild::AdviceRequired" do
    type { "AdviceRequired" }
  end

  factory :opportunity_guild_post, parent: :guild_post, class: "Guild::Opportunity" do
    type { "Opportunity" }
  end

  factory :case_study_guild_post, parent: :guild_post, class: "Guild::CaseStudy" do
    type { "CaseStudy" }
  end
end
