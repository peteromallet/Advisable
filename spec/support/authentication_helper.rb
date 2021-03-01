# frozen_string_literal: true

module AuthenticationHelper
  def authenticate_as(user_or_specialist)
    allow_any_instance_of(SessionManager).to receive(:current_user).and_return(
      user_or_specialist
    )

    allow_any_instance_of(SessionManager).to receive(:current_account).and_return(
      user_or_specialist.account
    )
  end
end
