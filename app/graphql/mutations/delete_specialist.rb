class Mutations::DeleteSpecialist < Mutations::BaseMutation
  include Mutations::Helpers::Authentication

  field :status, String, null: true

  def authorized?
    requires_specialist!
  end

  def resolve
    logout
    current_user.destroy!
    {status: "ok"}
  end
end
