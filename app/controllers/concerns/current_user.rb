module CurrentUser
  extend ActiveSupport::Concern

  included do
    extend Forwardable
    def_delegators :session_manager, :current_user, :current_account

    helper_method :current_user, :current_account, :logged_in?

    def logged_in?
      current_account.present?
    end

    def authenticate_with_magic_link
      return if logged_in? || magic_link.blank?
      session_manager.start_session(magic_link.account)
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
