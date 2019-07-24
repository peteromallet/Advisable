require 'rails_helper'

describe Task do
  include_examples "uid"
  include_examples "Airtable::Syncable"

  it 'has a valid factory' do
    task = build(:task)
    expect(task).to be_valid
  end

  describe 'self.due_date' do
    it 'returns tasks that have a due date on a given date' do
      a = create(:task, due_date: 1.day.from_now)
      b = create(:task, due_date: 2.days.from_now)
      tasks = Task.due_date(1.day.from_now)
      expect(tasks).to include(a)
      expect(tasks).not_to include(b)
    end
  end
end
