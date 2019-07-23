# A poicy to determin wether or not a given user has permission to carry out
# an action. The TaskPolicy is a PORO that follows the rules set out by the
# pundit gem.
class TaskPolicy < BasePolicy
  # Returns true if the user is the specialisr or the client.
  # DEPRECATED: Use the is_client or is_specialist methods separately. If you
  # are using the graphql autorize option you can pass multiple methods.
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
    return true if has_permission?("admin")
    return false if user.nil?
    ["Not Assigned", "Quote Requested", "Quote Provided"].include?(record.stage)
  end

  # Wether or not the current user has permission to update the due date for
  # a task.
  def update_due_date
    return false if user.nil?
    return true if has_permission?("admin")
    return true if ["Not Assigned", "Quote Requested", "Quote Provided"].include?(record.stage)
    return true if task.stage == "Assigned" && is_specialist
    false
  end

  # Wether or not the current user has permission to update the estimate for a
  # task.
  def update_estimate
    return true if has_permission?("admin")
    return false if user.nil?
    return true if ["Not Assigned", "Quote Requested"].include?(record.stage)
    return true if task.stage == "Quote Provided" && is_specialist 
    return true if task.stage == "Assigned" && is_specialist
    false
  end

  # Wether or not the current user has permission to update the flexible estimate
  # for a task. The reason we need another method for this rather than just
  # reusing the 'update_estimate' method is becuase in the update_task mutation
  # we iterate through all of the changes and call methods based on the
  # attributes that were updated. e.g update_name is called if the name attribute
  # is changed
  def update_flexible_estimate
    upate_estimate
  end

  def update_description
    return true if has_permission?("admin")
    return false if user.nil?
    ["Not Assigned", "Quote Requested", "Quote Provided"].include?(record.stage)
  end

  def delete
    return true if has_permission?("admin")
    ["Not Assigned", "Quote Requested", "Quote Provided"].include?(record.stage)
  end

  def set_repeating
    is_client || is_specialist || has_permission?("admin")
  end

  private

  def task
    record
  end
end
