class Mutations::DeleteAnswer < Mutations::BaseMutation
  argument :id, ID, required: true
  field :id, ID, null: true

  def authorized?(**args)
    requires_current_user!

    unless current_user.respond_to?(:answers)
      ApiError.invalid_request(
        code: "MUST_HAVE_ANSWERS",
        message: "Current user must be able to provide answers."
      )
    end

    true
  end

  def resolve(id:)
    answer = current_user.answers.find_by_uid!(id)
    answer.destroy!
    return {id: id}
  end
end
