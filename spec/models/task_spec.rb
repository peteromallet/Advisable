# frozen_string_literal: true

require "rails_helper"

RSpec.describe Task do
  let(:task) { create(:task, final_cost: 5000) }

  include_examples "uid"

  it "has a valid factory" do
    expect(task).to be_valid
  end

  describe "#invoice_hours" do
    it "returns the estimate" do
      task = build(:task, estimate: 5)
      expect(task.invoice_hours).to eq(5)
    end

    context "when the task has a flexible_estimate" do
      it "returns the flexible_estimate" do
        task = build(:task, flexible_estimate: 6, estimate: 5)
        expect(task.invoice_hours).to eq(6)
      end
    end
  end

  describe "self.due_date" do
    it "returns tasks that have a due date on a given date" do
      a = create(:task, due_date: 1.day.from_now)
      b = create(:task, due_date: 2.days.from_now)
      tasks = described_class.due_date(1.day.from_now)
      expect(tasks).to include(a)
      expect(tasks).not_to include(b)
    end
  end

  context "when stage changes to Approved" do
    before { allow(Stripe::PaymentIntent).to receive(:create).and_return(OpenStruct.new(id: "pi_#{SecureRandom.uuid}", status: "succeeded")) }

    it "creates a payout" do
      count = Payout.count
      task.update!(stage: "Approved")
      expect(Payout.count).to eq(count + 1)
      expect(Payout.last.attributes).to include("amount" => 5000, "sourcing_fee" => 400, "status" => "pending", "specialist_id" => task.application.specialist_id, "task_id" => task.id)
    end

    it "creates a Payment with all the right attributes" do
      count = Payment.count
      task.update!(stage: "Approved")
      expect(Payment.count).to eq(count + 1)
      expect(Payment.last.attributes).to include("amount" => 5000, "admin_fee" => 250, "status" => "succeeded", "company_id" => task.application.project.user.company_id, "specialist_id" => task.application.specialist_id, "task_id" => task.id)
    end

    context "when previous payments exist" do
      context "when less" do
        it "creates a payment with a diff" do
          create(:payment, task: task, amount: task.final_cost - 1000)
          count = Payment.count
          task.update!(stage: "Approved")
          expect(Payment.count).to eq(count + 1)
          expect(Payment.last.attributes).to include("amount" => 1000, "admin_fee" => 50, "status" => "succeeded", "company_id" => task.application.project.user.company_id, "specialist_id" => task.application.specialist_id, "task_id" => task.id)
        end
      end

      context "when equal" do
        it "does not create a payment" do
          create(:payment, task: task, amount: task.final_cost)
          count = Payment.count
          task.update!(stage: "Approved")
          expect(Payment.count).to eq(count)
        end
      end
    end

    context "when final cost is nil" do
      let(:task) { create(:task, final_cost: nil) }

      it "does nothing" do
        payout_count = Payout.count
        payment_count = Payment.count
        task.update!(stage: "Approved")
        expect(Payout.count).to eq(payout_count)
        expect(Payment.count).to eq(payment_count)
      end
    end

    context "when stage changes to something else" do
      it "does nothing" do
        payout_count = Payout.count
        payment_count = Payment.count
        task.update!(stage: "Deleted")
        expect(Payout.count).to eq(payout_count)
        expect(Payment.count).to eq(payment_count)
      end
    end
  end
end
