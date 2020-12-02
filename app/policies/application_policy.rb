class ApplicationPolicy < BasePolicy
  def is_client_owner?
    record.project.user == user
  end

  def is_specialist
    record.specialist == user
  end

  def belongs_to_company
    user.is_a?(User) && user.company.users.include?(record.project.user)
  end

  # Wether or not the user has access to read information about the application.
  def read?
    is_client_owner? || is_specialist || belongs_to_company || is_admin
  end
  alias write? read?
  alias create? read?
end
