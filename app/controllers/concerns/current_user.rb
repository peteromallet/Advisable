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

    def authenticate_with_magic_link
      return if user_logged_in?
      token = params.fetch("mlt", nil)
      uid = params.fetch("mluid", nil)
      return unless token.present? && uid.present?
      account = Account.find_by_uid(uid)
      return unless account.present?
      magic_link = MagicLink.for_path(account: account, token: token, path: request.path)
      return unless magic_link.present?
      magic_link.use
      # TODO: Eventually start_session should accept the account record
      user_or_specialist = magic_link.account.user || magic_link.account.specialist
      session_manager.start_session(user_or_specialist)
    end

    private

    def session_manager
      @session_manager ||= SessionManager.new(session: session, cookies: cookies)
    end
  end
end
