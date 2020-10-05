FactoryBot.define do
  factory :video_call do
    sequence(:uid) { "vid_#{SecureRandom.hex[0..14]}" }
    interview
  end
end
