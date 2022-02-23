# frozen_string_literal: true

FactoryBot.define do
  factory :payment_request do
    sequence(:uid) { "pyr_#{SecureRandom.hex[0..14]}" }
    line_items { [{"amount" => 10000, "description" => "Hundo"}, {"amount" => 20000, "description" => "Two Hundo"}] }
    status { "pending" }
    due_at { 5.days.from_now }
    company
    specialist
  end
end
