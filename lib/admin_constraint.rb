class AdminConstraint
  def matches?(request)
    return false unless request.session[:account_uid]
    account = Account.find_by(uid: request.session[:account_uid])
    account&.has_permission?("admin")
  end
end
