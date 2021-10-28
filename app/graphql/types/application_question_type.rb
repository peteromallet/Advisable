# frozen_string_literal: true
class Types::ApplicationQuestionType < Types::BaseType
  field :question, String, null: true
  field :answer, String, null: true
end
