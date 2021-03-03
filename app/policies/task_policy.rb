# frozen_string_literal: true

# A poicy to determin whether or not a given user has permission to carry out
# an action. The TaskPolicy is a PORO that follows the rules set out by the
# pundit gem.
class TaskPolicy < BasePolicy
  def is_client_owner?
    record.application.project.user == user
  end

  def is_specialist_owner?
    record.application.specialist == user
  end

  def via_client?
    is_client_owner? || record_belongs_to_company?
  end

  def via_specialist_or_client?
    is_specialist_owner? || via_client?
  end

  def update_name
    return true if is_admin

    changeable_stage? && via_specialist_or_client?
  end
  alias update_description update_name
  alias delete update_name

  # Whether or not the current user has permission to update the due date for
  # a task.
  def update_due_date
    return false if user.nil?
    return true if is_admin
    return true if changeable_stage?
    return true if record.stage == 'Assigned' && is_specialist_owner?

    false
  end

  # Whether or not the current user has permission to update the estimate for a
  # task.
  def update_estimate
    return false if user.nil?
    return true if is_admin
    return true if ['Not Assigned', 'Quote Requested', 'Requested To Start'].include?(record.stage)
    return true if is_specialist_owner? && ['Quote Provided', 'Assigned'].include?(record.stage)

    false
  end
  alias update_flexible_estimate update_estimate
  alias update_estimate_type update_estimate

  def update_trial
    is_admin || is_specialist_owner?
  end

  def set_repeating
    is_admin || via_specialist_or_client?
  end

  private

  def changeable_stage?
    ['Not Assigned', 'Quote Requested', 'Quote Provided', 'Requested To Start'].include?(record.stage)
  end

  def company_of_record
    record.application&.project&.user&.company
  end
end
