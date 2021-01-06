# frozen_string_literal: true

class Mutations::DeleteSpecialist < Mutations::BaseMutation
  include Mutations::Helpers::Authentication

  field :status, String, null: true

  def authorized?
    requires_specialist!
  end

  def resolve
    current_user.account.update!(deleted_at: Time.zone.now, password: SecureRandom.hex)
    current_user.account.magic_links.destroy_all
    logout
    {status: "ok"}
  end
end
