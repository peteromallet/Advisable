class Mutations::AnswerQuestion < Mutations::BaseMutation
  argument :question, ID, required: true
  argument :content, String, required: true

  field :answer, Types::AnswerType, null: false

  def authorized?(**args)
    requires_current_user!

    unless current_user.respond_to?(:answers)
      ApiError.invalid_request(
        code: 'MUST_HAVE_ANSWERS',
        message: 'Current user must be able to provide answers.'
      )
    end

    true
  end

  def resolve(**args)
    question = Question.find_by_uid!(args[:question])
    answer = current_user.answers.find_or_initialize_by(question: question)
    answer.content = args[:content]
    answer.save!
    return {answer: answer}
  rescue Service::Error => e
    return {errors: [e]}
  end
end
