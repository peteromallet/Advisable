# Task
#
# Inside of the UI tasks are referred to as specialist projects. They are what
# are assigned to a specialist when a client is working with a specialist.
#
# == Attributes
#
# estimate_type [String] The type of estimate that was given for the task. This
#   should either be 'Hourly' or 'Fixed'.
#
# estimate [Int] The estimate for the task. If estimate_type is 'Hourly' this
#   indicates a number of hours. If estimate_type is 'Fixed' this represents
#   a currency amount in cents.
#
# flexible_estimate [Int] The flexible estimate for the task. When set it
#   means the task has a flexible estimate ranging from the 'estimate' value to
#   the 'flexible_estimate' value. If estimate_type is 'Hourly' this represents
#   a number of hours. If estimate_type is 'Fixed' this represents a currency
#   amount in cents.
#
# final_cost [Int] Represents the final cost of the task in cents. This is
#   usually set when the freelancer submits the task for approval from the
#   client.
#
class Task < ApplicationRecord
  include Uid
  include Airtable::Syncable

  validates :estimate_type, inclusion: { in: %w[Hourly Fixed] }, allow_nil: true

  belongs_to :application

  # Returns a collection of tasks that have a due date on a given date.
  def self.due_date(date)
    Task.where('due_date >= ?', date.beginning_of_day).where(
      'due_date <= ?',
      date.end_of_day
    )
  end

  # Returns the cost of the task
  def cost
    quote = flexible_estimate || estimate
    quote * application.rate
  end

  # Returns the amount of hours that should be invoiced for the task
  def invoice_hours
    (flexible_estimate || estimate).ceil
  end
end
