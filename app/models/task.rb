class Task < ApplicationRecord
  include UID
  include Airtable::Syncable
  belongs_to :application

  def self.due_date(date)
    Task.where("due_date >= ?", date.beginning_of_day)
        .where("due_date <= ?", date.end_of_day)
  end
end
