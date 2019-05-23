class TaskPolicy < BasePolicy
  def is_specialist_or_client
    return true if record.application.specialist == user
    return true if record.application.project.user == user
  end

  def is_client
    return true if record.application.project.user == user
  end

  def is_specialist
    return true if record.application.specialist == user
  end

  def update_name
    return true if has_permission?("projects:all")
    return false if user.nil?
    ["Not Assigned", "Quote Requested", "Quote Provided"].include?(record.stage)
  end

  def update_due_date
    return true if has_permission?("projects:all")
    return false if user.nil?
    return true if ["Not Assigned", "Quote Requested", "Quote Provided"].include?(record.stage)
    return true if task.stage == "Assigned" && is_specialist
    false
  end

  def update_estimate
    return true if has_permission?("projects:all")
    return false if user.nil?
    return true if ["Not Assigned", "Quote Requested"].include?(record.stage)
    return true if task.stage == "Quote Provided" && is_specialist 
    return true if task.stage == "Assigned" && is_specialist
    false
  end

  def update_flexible_estimate
    return true if has_permission?("projects:all")
    return false if user.nil?
    return true if ["Not Assigned", "Quote Requested"].include?(record.stage)
    return true if task.stage == "Quote Provided" && is_specialist 
    return true if task.stage == "Assigned" && is_specialist
    false
  end

  def update_description
    return true if has_permission?("projects:all")
    return false if user.nil?
    ["Not Assigned", "Quote Requested", "Quote Provided"].include?(record.stage)
  end

  def delete
    return true if has_permission?("projects:all")
    ["Not Assigned", "Quote Requested", "Quote Provided"].include?(record.stage)
  end

  def set_repeating
    is_client || is_specialist || has_permission?("projects:all")
  end

  private

  def task
    record
  end
end