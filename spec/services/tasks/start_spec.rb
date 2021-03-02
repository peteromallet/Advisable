# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::Start do
  let(:task) { create(:task, stage: "Assigned") }

  before do
    allow_any_instance_of(Task).to receive(:sync_to_airtable)
  end

  it "sets the stage to 'Working'" do
    expect do
      described_class.call(task: task)
    end.to change {
      task.reload.stage
    }.from("Assigned").to("Working")
  end

  context "when the task stage is not 'Assigned'" do
    let(:task) { create(:task, stage: "Quote Requested") }

    it "raises an error" do
      expect do
        described_class.call(task: task)
      end.to raise_error("tasks.mustBeAssigned")
    end
  end

  context "when the task has no estimate" do
    let(:task) { create(:task, stage: "Assigned", estimate: nil) }

    it "raises an error" do
      expect do
        described_class.call(task: task)
      end.to raise_error("tasks.estimateRequired")
    end
  end

  context "when the task has no due_date" do
    let(:task) { create(:task, stage: "Assigned", due_date: nil) }

    it "raises an error" do
      expect do
        described_class.call(task: task)
      end.to raise_error("tasks.dueDateRequired")
    end
  end
end
