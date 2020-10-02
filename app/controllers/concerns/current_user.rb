module CurrentUser
  extend ActiveSupport::Concern

  included do
    helper_method :user_logged_in?, :current_user

    def current_user
      @current_user ||= session_manager.current_user
    end

    def user_logged_in?
      current_user.present?
    end

    private

    def session_manager
      @session_manager ||= SessionManager.new(session: session, cookies: cookies)
    end
  end
end
