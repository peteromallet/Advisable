FactoryBot.define do
  factory :payment do
    project
    uid "pay_1234"
    source_id "src_1234"
    charge_id "ch_1234"
    amount 100_00
    status "captured"
  end
end
