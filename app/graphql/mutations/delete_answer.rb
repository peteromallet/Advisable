# frozen_string_literal: true

module Mutations
  class DeleteAnswer < Mutations::BaseMutation
    argument :id, ID, required: true
    field :id, ID, null: true

    def authorized?(**_args)
      requires_specialist!
    end

    def resolve(id:)
      answer = current_user.answers.find_by_uid!(id)
      answer.destroy!
      {id:}
    end
  end
end
