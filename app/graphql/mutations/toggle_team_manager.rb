# frozen_string_literal: true
class Mutations::ToggleTeamManager < Mutations::BaseMutation
  argument :user_id, ID, required: true

  field :user, Types::User, null: true

  def authorized?(**args)
    requires_team_manager!
  end

  def resolve(user_id:)
    user = User.find_by(uid: user_id)
    user.account.toggle_team_manager!
    {user: user}
  end
end
