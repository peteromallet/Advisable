# frozen_string_literal: true
class Mutations::AnswerQuestion < Mutations::BaseMutation
  argument :question, ID, required: true
  argument :content, String, required: true

  field :answer, Types::AnswerType, null: false

  def authorized?(**args)
    requires_specialist!
  end

  def resolve(**args)
    question = Question.find_by_uid!(args[:question])
    answer = current_user.answers.find_or_initialize_by(question: question)
    answer.content = args[:content]
    answer.save!
    {answer: answer}
  end
end
