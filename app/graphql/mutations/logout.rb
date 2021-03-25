# frozen_string_literal: true

module Mutations
  class Logout < Mutations::BaseMutation
    field :success, Boolean, null: true

    def resolve(*_args)
      requires_current_user!
      logout
      {success: true}
    end
  end
end
