# frozen_string_literal: true

module Types
  class QuestionType < Types::BaseType
    field :id, ID, null: false, method: :uid
    field :content, String, null: false
  end
end
