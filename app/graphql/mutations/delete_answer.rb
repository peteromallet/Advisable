class Mutations::DeleteAnswer < Mutations::BaseMutation
  argument :id, ID, required: true
  field :id, ID, null: true

  def authorized?(**args)
    requires_specialist!
  end

  def resolve(id:)
    answer = current_user.answers.find_by_uid!(id)
    answer.destroy!
    return {id: id}
  end
end
