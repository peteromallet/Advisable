class Task < ApplicationRecord
  include Uid
  include Airtable::Syncable
  belongs_to :application

  # Returns a collection of tasks that have a due date on a given date.
  def self.due_date(date)
    Task.where("due_date >= ?", date.beginning_of_day)
        .where("due_date <= ?", date.end_of_day)
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
