class Task < ApplicationRecord
  include Uid
  include Airtable::Syncable
  belongs_to :application

  # Returns a collection of tasks that have a due date on a given date.
  def self.due_date(date)
    Task.where("due_date >= ?", date.beginning_of_day)
        .where("due_date <= ?", date.end_of_day)
  end
end
