FactoryBot.define do
  factory :guild_post_image, class: 'Guild::PostImage' do
    position { 1 }
    cover { true }
  end
end
