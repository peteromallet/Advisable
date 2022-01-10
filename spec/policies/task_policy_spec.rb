# frozen_string_literal: true

require "rails_helper"

RSpec.describe TaskPolicy do
  let(:task) { create(:task) }

  describe "#update_due_date" do
    it "returns true if the user is an admin" do
      user = task.application.project.user
      user.account.update(permissions: ["admin"])
      policy = described_class.new(user, task)
      expect(policy.update_due_date).to be_truthy
    end

    it "returns false if there is no user" do
      policy = described_class.new(nil, task)
      expect(policy.update_due_date).to be_falsey
    end

    ["Not Assigned", "Quote Requested", "Quote Provided"].each do |stage|
      context "when the task stage is #{stage}" do
        let(:task) { create(:task, stage:) }

        it "returns true" do
          policy = described_class.new(task.application.project.user, task)
          expect(policy.update_due_date).to be_truthy
        end
      end
    end

    context "when the task stage is 'Assigned'" do
      let(:task) { create(:task, stage: "Assigned") }

      it "returns true for specialists" do
        policy = described_class.new(task.application.specialist, task)
        expect(policy.update_due_date).to be_truthy
      end

      it "returns false for the client" do
        policy = described_class.new(task.application.project.user, task)
        expect(policy.update_due_date).to be_falsey
      end
    end

    context "when the stage is 'Working'" do
      it "returns false for the specialist" do
        policy = described_class.new(task.application.specialist, task)
        expect(policy.update_due_date).to be_falsey
      end

      it "returns false for the client" do
        policy = described_class.new(task.application.project.user, task)
        expect(policy.update_due_date).to be_falsey
      end
    end
  end

  describe "#update_estimate" do
    it "returns true if the user is an admin" do
      user = task.application.project.user
      user.account.update(permissions: ["admin"])
      policy = described_class.new(user, task)
      expect(policy.update_estimate).to be_truthy
    end

    it "returns false if there is no user" do
      policy = described_class.new(nil, task)
      expect(policy.update_estimate).to be_falsey
    end

    ["Not Assigned", "Quote Requested"].each do |stage|
      context "when the task stage is #{stage}" do
        let(:task) { create(:task, stage:) }

        it "returns true for client" do
          policy = described_class.new(task.application.project.user, task)
          expect(policy.update_estimate).to be_truthy
        end

        it "returns true for specialist" do
          policy = described_class.new(task.application.specialist, task)
          expect(policy.update_estimate).to be_truthy
        end
      end
    end

    ["Assigned", "Quote Provided"].each do |stage|
      context "when the task stage is #{stage}" do
        let(:task) { create(:task, stage:) }

        it "returns true for specialists" do
          policy = described_class.new(task.application.specialist, task)
          expect(policy.update_estimate).to be_truthy
        end

        it "returns false for the client" do
          policy = described_class.new(task.application.project.user, task)
          expect(policy.update_estimate).to be_falsey
        end
      end
    end

    context "when the stage is 'Working'" do
      it "returns false for the specialist" do
        policy = described_class.new(task.application.specialist, task)
        expect(policy.update_estimate).to be_falsey
      end

      it "returns false for the client" do
        policy = described_class.new(task.application.project.user, task)
        expect(policy.update_estimate).to be_falsey
      end
    end
  end

  describe "#update_flexible_estimate" do
    it "calls #update_flexible_estimate" do
      user = task.application.project.user
      policy = described_class.new(user, task)
      allow(policy).to receive(:update_flexible_estimate)
      policy.update_flexible_estimate
    end
  end

  describe "#set_repeating" do
    it "returns true for the client" do
      policy = described_class.new(task.application.project.user, task)
      expect(policy.set_repeating).to be_truthy
    end

    it "returns true for the specialist" do
      policy = described_class.new(task.application.specialist, task)
      expect(policy.set_repeating).to be_truthy
    end

    it "returns false for a random user" do
      policy = described_class.new(create(:user), task)
      expect(policy.set_repeating).to be_falsey
    end

    it "returns true for admins" do
      policy = described_class.new(create(:user, account: create(:account, permissions: ["admin"])), task)
      expect(policy.set_repeating).to be_truthy
    end
  end
end
