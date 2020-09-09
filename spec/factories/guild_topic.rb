FactoryBot.define do
  factory :guild_topic, class: 'Guild::Topic' do
    sequence(:name) { |n| "topic_name_#{n}" }
  end
end