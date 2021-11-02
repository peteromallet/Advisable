# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::StartTask do
  let(:task) { create(:task, stage: "Assigned") }

  let(:query) do
    <<-GRAPHQL
    mutation {
      startTask(input: {
        task: "#{task.uid}",
      }) {
        task {
          id
          stage
        }
      }
    }
    GRAPHQL
  end

  let(:context) { {current_user: task.application.specialist} }

  before { allow(Stripe::PaymentIntent).to receive(:create).and_return(OpenStruct.new(id: "pi_#{SecureRandom.uuid}", status: "succeeded")) }

  it "sets the stage to 'Working'" do
    response = AdvisableSchema.execute(query, context: context)
    stage = response["data"]["startTask"]["task"]["stage"]
    expect(stage).to eq("Working")
  end

  describe "creating Payments" do
    context "when fixed" do
      let(:task) { create(:task, stage: "Assigned", estimate: 1000, estimate_type: "Fixed") }

      it "creates a Payment with all the right attributes" do
        count = Payment.count
        AdvisableSchema.execute(query, context: context)
        expect(Payment.count).to eq(count + 1)
        expect(Payment.last.attributes).to include("amount" => 1000, "admin_fee" => 50, "status" => "succeeded", "company_id" => task.application.project.user.company_id, "specialist_id" => task.application.specialist_id, "task_id" => task.id)
      end
    end

    context "when hourly" do
      let(:task) { create(:task, stage: "Assigned", estimate: 20, flexible_estimate: 10, estimate_type: "Hourly") }

      it "creates a Payment with all the right attributes" do
        count = Payment.count
        AdvisableSchema.execute(query, context: context)
        expect(Payment.count).to eq(count + 1)
        rate = task.application.invoice_rate
        expect(Payment.last.attributes).to include("amount" => rate * 10, "admin_fee" => rate * 10 * 0.05, "status" => "succeeded", "company_id" => task.application.project.user.company_id, "specialist_id" => task.application.specialist_id, "task_id" => task.id)
      end

      context "when flexible is empty" do
        let(:task) { create(:task, stage: "Assigned", estimate: 20, flexible_estimate: nil, estimate_type: "Hourly") }

        it "takes estimate" do
          AdvisableSchema.execute(query, context: context)
          rate = task.application.invoice_rate
          expect(Payment.last.attributes).to include("amount" => rate * 20, "admin_fee" => rate * 20 * 0.05, "status" => "succeeded", "company_id" => task.application.project.user.company_id, "specialist_id" => task.application.specialist_id, "task_id" => task.id)
        end
      end

      context "when estimate is 0" do
        let(:task) { create(:task, stage: "Assigned", flexible_estimate: 10, estimate: 0, estimate_type: "Hourly") }

        it "takes flexible" do
          AdvisableSchema.execute(query, context: context)
          rate = task.application.invoice_rate
          expect(Payment.last.attributes).to include("amount" => rate * 10, "admin_fee" => rate * 10 * 0.05, "status" => "succeeded", "company_id" => task.application.project.user.company_id, "specialist_id" => task.application.specialist_id, "task_id" => task.id)
        end
      end

      context "when flexible is 0" do
        let(:task) { create(:task, stage: "Assigned", estimate: 20, flexible_estimate: 0, estimate_type: "Hourly") }

        it "takes estimate" do
          AdvisableSchema.execute(query, context: context)
          rate = task.application.invoice_rate
          expect(Payment.last.attributes).to include("amount" => rate * 20, "admin_fee" => rate * 20 * 0.05, "status" => "succeeded", "company_id" => task.application.project.user.company_id, "specialist_id" => task.application.specialist_id, "task_id" => task.id)
        end
      end
    end

    context "when bank transfer is true" do
      let(:task) { create(:task, stage: "Assigned", estimate: 1000, estimate_type: "Fixed") }

      it "does not create a Payment" do
        task.application.project.user.company.update(project_payment_method: "Bank Transfer")
        expect(Stripe::PaymentIntent).not_to receive(:create)
        count = Payment.count
        AdvisableSchema.execute(query, context: context)
        expect(Payment.count).to eq(count + 1)
        expect(Payment.last.attributes).to include("amount" => 1000, "admin_fee" => 50, "status" => "pending", "company_id" => task.application.project.user.company_id, "specialist_id" => task.application.specialist_id, "task_id" => task.id)
      end
    end
  end

  context "when the task does not have an estimate" do
    let(:task) { create(:task, stage: "Assigned", estimate: nil) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]
      expect(error["message"]).to eq("tasks.estimateRequired")
    end
  end

  context "when the task does not have a due date" do
    let(:task) { create(:task, stage: "Assigned", due_date: nil) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]
      expect(error["message"]).to eq("tasks.dueDateRequired")
    end
  end

  context "when the specialist doesn't have access to the project" do
    let(:context) { {current_user: create(:specialist)} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("notAuthorized")
    end
  end

  context "when there is no user" do
    let(:context) { {current_user: nil} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("notAuthorized")
    end
  end

  context "when the client is logged in" do
    let(:context) { {current_user: task.application.project.user} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("notAuthorized")
    end
  end

  context "when the task stage is Quote Provided" do
    let(:task) { create(:task, stage: "Quote Provided") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]
      expect(error["message"]).to eq("tasks.mustBeAssigned")
    end
  end

  context "when the task stage is Working" do
    let(:task) { create(:task, stage: "Working") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]
      expect(error["message"]).to eq("tasks.mustBeAssigned")
    end
  end

  context "when the task stage is Submitted" do
    let(:task) { create(:task, stage: "Submitted") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]
      expect(error["message"]).to eq("tasks.mustBeAssigned")
    end
  end
end
