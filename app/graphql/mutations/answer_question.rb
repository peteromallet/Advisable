# frozen_string_literal: true

module Mutations
  class AnswerQuestion < Mutations::BaseMutation
    argument :content, String, required: true
    argument :question, ID, required: true

    field :answer, Types::AnswerType, null: false

    def authorized?(**_args)
      requires_specialist!
    end

    def resolve(**args)
      question = Question.find_by_uid!(args[:question])
      answer = current_user.answers.find_or_initialize_by(question:)
      answer.content = args[:content]
      answer.save!
      {answer:}
    end
  end
end
