FactoryBot.define do
  factory :webhook do
    url { "http://testing.testing/testing" }
    status { "pending" }
    data {{ test: "data" }}
  end
end
