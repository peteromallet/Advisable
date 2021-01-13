# frozen_string_literal: true

class Mutations::DeleteSpecialist < Mutations::BaseMutation
  include Mutations::Helpers::Authentication

  field :status, String, null: true

  def authorized?
    requires_specialist!
  end

  def resolve
    current_user.account.disable!
    logout
    {status: "ok"}
  end
end
