require 'rails_helper'

RSpec.describe Task do
  include_examples 'uid'
  include_examples 'Airtable::Syncable'

  it 'has a valid factory' do
    task = build(:task)
    expect(task).to be_valid
  end

  describe '#cost' do
    it 'returns the cost for the task based on the estimate' do
      application = create(:application, rate: 10)
      task = create(:task, estimate: 5, application: application)
      expect(task.cost).to eq(10 * 5)
    end

    context 'when the task has a flexible estimate' do
      it 'returns the cost based on the flexible estimate' do
        application = create(:application, rate: 10)
        task =
          create(
            :task,
            flexible_estimate: 10, estimate: 5, application: application
          )
        expect(task.cost).to eq(10 * 10)
      end
    end
  end

  describe '#invoice_hours' do
    it 'returns the estimate' do
      task = build(:task, estimate: 5)
      expect(task.invoice_hours).to eq(5)
    end

    context 'when the task has a flexible_estimate' do
      it 'returns the flexible_estimate' do
        task = build(:task, flexible_estimate: 6, estimate: 5)
        expect(task.invoice_hours).to eq(6)
      end
    end
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
