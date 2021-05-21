# frozen_string_literal: true

module Mutations
  class RemoveUserFromCompany < Mutations::BaseMutation
    argument :user_id, ID, required: true

    field :success, Boolean, null: true

    def authorized?(user_id:)
      requires_team_manager!

      user = User.find_by!(uid: user_id)
      if current_user.company_id != user.company_id
        ApiError.invalid_request("USER_BELONGS_TO_A_DIFFERENT_COMPANY", "This user belongs to a different company and can't be removed by you.")
      elsif user.company.users.count == 1
        ApiError.invalid_request("noUsersLeftInCompany", "This user is the last user in the company and can't be deleted")
      end

      true
    end

    def resolve(user_id:)
      User.find_by!(uid: user_id).disable!(current_account_id)
      {success: true}
    end
  end
end
