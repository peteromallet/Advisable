FactoryBot.define do
  factory :payment do
    project
    sequence(:uid) { "pay_#{SecureRandom.hex[0..14]}" }
    currency "usd"
    source_id "src_1234"
    charge_id "ch_1234"
    amount 100_00
    status "captured"
  end
end
