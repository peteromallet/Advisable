# frozen_string_literal: true

FactoryBot.define do
  factory :post_prompt do
    label
    featured { true }
    prompt_cta { "This is a prompt cta" }
    prompt { "This is a prompt for the post body" }
  end
end
