FactoryBot.define do
  factory :guild_post, class: 'Guild::Post' do
    title    { Faker::Quote.yoda[0..149] }
    body     { Faker::Lorem.paragraph_by_chars(number: 256, supplemental: false) }
    body_raw { "serializedData" }
    status   { Guild::Post.statuses["published"] }
    # reactions
    # comments
    specialist

    trait :with_guild_comment do
      after(:create) do |guild_post|
        create(:guild_comment, guild_post: guild_post)
      end
    end
  end


  factory :advice_required_guild_post, parent: :guild_post, class: 'Guild::Post::AdviceRequired' do
    type { "AdviceRequired" }
    need_help { false }
  end

  factory :opportunity_guild_post, parent: :guild_post, class: 'Guild::Post::Opportunity' do
    type { "Opportunity" }
  end
  
  factory :case_study_guild_post, parent: :guild_post, class: 'Guild::Post::CaseStudy' do
    type { "CaseStudy" }
  end
end