# frozen_string_literal: true

module Types
  class AnswerType < Types::BaseType
    field :id, ID, null: false, method: :uid
    field :content, String, null: false
    field :question, Types::QuestionType, null: false
  end
end
