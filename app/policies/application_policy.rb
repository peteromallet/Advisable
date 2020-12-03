class ApplicationPolicy < BasePolicy
  def is_client_owner?
    record.project.user == user
  end

  def is_specialist?
    record.specialist == user
  end

  def belongs_to_company?
    user.is_a?(User) && user.company.users.include?(record.project.user)
  end

  def via_client?
    is_client_owner? || belongs_to_company?
  end
  alias reject_proposal? via_client?

  # Wether or not the user has access to read information about the application.
  def read?
    is_specialist? || via_client? || is_admin
  end
  alias write? read?
  alias create? read?
end
