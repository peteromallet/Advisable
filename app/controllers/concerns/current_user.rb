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
      return if user_logged_in? || magic_link.blank?
      magic_link.use
      # TODO: Eventually start_session should accept the account record
      user_or_specialist = magic_link.account.user || magic_link.account.specialist
      session_manager.start_session(user_or_specialist)
      redirect_without_magic_link_params
    end

    private

    def magic_link
      @magic_link ||= begin
        token = params.fetch("mlt", nil)
        uid = params.fetch("mluid", nil)
        return if token.blank? || uid.blank?
        account = Account.find_by_uid(uid)
        return if account.blank?
        MagicLink.for_path(account: account, token: token, path: request.path)
      end
    end

    def redirect_without_magic_link_params
      redirect_to params.permit!.except(:mlt, :mluid)
    end

    def session_manager
      @session_manager ||= SessionManager.new(session: session, cookies: cookies)
    end
  end
end
