require 'rails_helper'

RSpec.describe TaskPolicy do
  let(:task) { create(:task) }

  describe '#update_due_date' do
    it 'returns true if the user is an admin' do
      user = task.application.project.user
      user.account.update(permissions: ["admin"])
      policy = TaskPolicy.new(user, task)
      expect(policy.update_due_date).to be_truthy
    end

    it 'returns false if there is no user' do
      policy = TaskPolicy.new(nil, task)
      expect(policy.update_due_date).to be_falsey
    end

    ["Not Assigned", "Quote Requested", "Quote Provided"].each do |stage|
      context "when the task stage is #{stage}" do
        let(:task) { create(:task, stage: stage) }

        it "returns true" do
          policy = TaskPolicy.new(task.application.project.user, task)
          expect(policy.update_due_date).to be_truthy
        end
      end
    end

    context "when the task stage is 'Assigned'" do
      let(:task) { create(:task, stage: 'Assigned') }

      it "returns true for specialists" do
        policy = TaskPolicy.new(task.application.specialist, task)
        expect(policy.update_due_date).to be_truthy
      end

      it "returns false for the client" do
        policy = TaskPolicy.new(task.application.project.user, task)
        expect(policy.update_due_date).to be_falsey
      end
    end

    context "when the stage is 'Working'" do
      it "returns false for the specialist" do
        policy = TaskPolicy.new(task.application.specialist, task)
        expect(policy.update_due_date).to be_falsey
      end

      it "returns false for the client" do
        policy = TaskPolicy.new(task.application.project.user, task)
        expect(policy.update_due_date).to be_falsey
      end
    end
  end

  describe '#update_estimate' do
    it 'returns true if the user is an admin' do
      user = task.application.project.user
      user.account.update(permissions: ["admin"])
      policy = TaskPolicy.new(user, task)
      expect(policy.update_estimate).to be_truthy
    end

    it 'returns false if there is no user' do
      policy = TaskPolicy.new(nil, task)
      expect(policy.update_estimate).to be_falsey
    end

    ["Not Assigned", "Quote Requested"].each do |stage|
      context "when the task stage is #{stage}" do
        let(:task) { create(:task, stage: stage) }

        it "returns true for client" do
          policy = TaskPolicy.new(task.application.project.user, task)
          expect(policy.update_estimate).to be_truthy
        end

        it "returns true for specialist" do
          policy = TaskPolicy.new(task.application.specialist, task)
          expect(policy.update_estimate).to be_truthy
        end
      end
    end

    ["Assigned", "Quote Provided"].each do |stage|
      context "when the task stage is #{stage}" do
        let(:task) { create(:task, stage: stage) }

        it "returns true for specialists" do
          policy = TaskPolicy.new(task.application.specialist, task)
          expect(policy.update_estimate).to be_truthy
        end

        it "returns false for the client" do
          policy = TaskPolicy.new(task.application.project.user, task)
          expect(policy.update_estimate).to be_falsey
        end
      end
    end

    context "when the stage is 'Working'" do
      it "returns false for the specialist" do
        policy = TaskPolicy.new(task.application.specialist, task)
        expect(policy.update_estimate).to be_falsey
      end

      it "returns false for the client" do
        policy = TaskPolicy.new(task.application.project.user, task)
        expect(policy.update_estimate).to be_falsey
      end
    end
  end

  describe '#update_flexible_estimate' do
    it 'calls #update_estimate' do
      user = task.application.project.user
      policy = TaskPolicy.new(user, task)
      expect(policy).to receive(:update_estimate)
      policy.update_flexible_estimate
    end
  end

  context "#set_repeating" do
    it 'returns true for the client' do
      policy = TaskPolicy.new(task.application.project.user, task)
      expect(policy.set_repeating).to be_truthy
    end

    it 'returns true for the specialist' do
      policy = TaskPolicy.new(task.application.specialist, task)
      expect(policy.set_repeating).to be_truthy
    end

    it 'returns false for a random user' do
      policy = TaskPolicy.new(create(:user), task)
      expect(policy.set_repeating).to be_falsey
    end

    it 'returns true for admins' do
      policy = TaskPolicy.new(create(:user, account: create(:account, permissions: ["admin"])), task)
      expect(policy.set_repeating).to be_truthy
    end
  end
end
