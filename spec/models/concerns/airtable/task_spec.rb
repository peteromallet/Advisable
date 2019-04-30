require 'rails_helper'

describe Airtable::Task do
  describe "syncing" do
    let(:task) {
      create(:task, {
        name: nil,
        stage: nil,
        estimate: nil,
        due_date: nil,
        description: nil,
        submitted_for_approval_comment: nil,
      })
    }

    let(:application) {
      create(:application)
    }
  
    let(:airtable) {
      Airtable::Task.new({
        "Name" => "Updated",
        "Stage" => "Assigned",
        "Estimate" => 8,
        "Due Date" => 2.days.ago,
        "Description" => "description",
        "Submitted For Approval Comment" => "comment",
        "Application" => [application.airtable_id]
      }, id: task.airtable_id)
    }

    it "syncs the name" do
      expect { airtable.sync }.to change {
        task.reload.name
      }.from(nil).to(airtable.fields["Name"])
    end

    it "syncs the stage" do
      expect { airtable.sync }.to change {
        task.reload.stage
      }.from(nil).to(airtable.fields["Stage"])
    end

    it "syncs the estimate" do
      expect { airtable.sync }.to change {
        task.reload.estimate
      }.from(nil).to(airtable.fields["Estimate"])
    end

    it "syncs the due date" do
      expect(task.reload.due_date).to be_nil
      airtable.sync
      expect(task.reload.due_date).to be_within(2.seconds).of(airtable.fields["Due Date"])
    end

    it "syncs the description" do
      expect { airtable.sync }.to change {
        task.reload.description
      }.from(nil).to(airtable.fields["Description"])
    end

    it "syncs the Submitted For Approval Comment" do
      expect { airtable.sync }.to change {
        task.reload.submitted_for_approval_comment
      }.from(nil).to(airtable.fields["Submitted For Approval Comment"])
    end

    it "sync the Application" do
      expect { airtable.sync }.to change {
        task.reload.application_id
      }.to(application.id)
    end
  end

  describe "push" do
    let(:task) { create(:task) }
    let(:airtable) { Airtable::Task.new({}, id: task.airtable_id) }

    it "pushes the data" do
      expect(airtable).to receive(:[]=).with("ID", task.uid)
      expect(airtable).to receive(:[]=).with("Name", task.name)
      expect(airtable).to receive(:[]=).with("Stage", task.stage)
      expect(airtable).to receive(:[]=).with("Estimate", task.estimate)
      expect(airtable).to receive(:[]=).with("Application", [task.application.airtable_id])
      expect(airtable).to receive(:[]=).with("Due Date", task.due_date.try(:strftime, "%Y-%m-%d"))
      expect(airtable).to receive(:[]=).with("Description", task.description)
      expect(airtable).to receive(:save)
      airtable.push(task)
    end
  end
end