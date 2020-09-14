class Mutations::AnswerQuestion < Mutations::BaseMutation
  argument :question, ID, required: true
  argument :answer, String, required: true

  field :answer, Types::AnswerType, null: false

  def authorized?(**args)
    true
  end

  def resolve(**args)
    question = Question.find_by_uid!(args[:question])
    answer = current_user.answers.find_or_create_by!(question: question)
    answer.content = args[:answer]
    answer.save!
    return {answer: answer}
  rescue Service::Error => e
    return {errors: [e]}
  end
end
