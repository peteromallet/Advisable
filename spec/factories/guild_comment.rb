FactoryBot.define do
  factory :guild_comment, class: 'Guild::Comment' do
    body    { Faker::TvShows::MichaelScott.quote }
    specialist

    trait :with_guild_post do
      post { association(:guild_post) }
    end
  end
end