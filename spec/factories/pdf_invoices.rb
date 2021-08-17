# frozen_string_literal: true

FactoryBot.define do
  factory :pdf_invoice do
    month { 8 }
    year { 2021 }
    company
  end
end
