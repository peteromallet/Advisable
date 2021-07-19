# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::ApproveTask do
  let(:task) { create(:task, stage: "Submitted", final_cost: 5000) }

  let(:query) do
    <<-GRAPHQL
      mutation {
        approveTask(input: {
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

  let(:context) { {current_user: task.application.project.user} }

  before do
    allow(Stripe::PaymentIntent).to receive(:create).and_return(OpenStruct.new(id: "pi_#{SecureRandom.uuid}", status: "succeeded"))
    allow_any_instance_of(Task).to receive(:sync_to_airtable)
  end

  it "sets the stage to 'Approved'" do
    response = AdvisableSchema.execute(query, context: context)
    stage = response["data"]["approveTask"]["task"]["stage"]
    expect(stage).to eq("Approved")
  end

  it "creates a payout" do
    count = Payout.count
    AdvisableSchema.execute(query, context: context)
    expect(Payout.count).to eq(count + 1)
    expect(Payout.last.attributes).to include("amount" => 5000, "sourcing_fee" => 400, "status" => "pending", "specialist_id" => task.application.specialist_id, "task_id" => task.id)
  end

  context "when the user doesn't have access to the project" do
    let(:context) { {current_user: create(:user)} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("notAuthorized")
    end
  end

  context "when there is no user" do
    let(:context) { {current_user: nil} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("notAuthorized")
    end
  end

  context "when the specialist is logged in" do
    let(:context) { {current_user: task.application.specialist} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("notAuthorized")
    end
  end

  context "when the task stage is not Submitted" do
    let(:task) { create(:task, stage: "Assigned") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["message"]
      expect(error).to eq("tasks.statusNotSubmitted")
    end
  end

  describe "creating payments" do
    it "creates a Payment with all the right attributes" do
      count = Payment.count
      AdvisableSchema.execute(query, context: context)
      expect(Payment.count).to eq(count + 1)
      expect(Payment.last.attributes).to include("amount" => 5000, "admin_fee" => 250, "status" => "succeeded", "company_id" => task.application.project.user.company_id, "specialist_id" => task.application.specialist_id, "task_id" => task.id)
    end

    context "when previous payments exist" do
      context "when less" do
        it "creates a payment with a diff" do
          create(:payment, task: task, amount: task.final_cost - 1000)
          count = Payment.count
          AdvisableSchema.execute(query, context: context)
          expect(Payment.count).to eq(count + 1)
          expect(Payment.last.attributes).to include("amount" => 1000, "admin_fee" => 50, "status" => "succeeded", "company_id" => task.application.project.user.company_id, "specialist_id" => task.application.specialist_id, "task_id" => task.id)
        end
      end

      context "when equal" do
        it "does not create a payment" do
          create(:payment, task: task, amount: task.final_cost)
          count = Payment.count
          AdvisableSchema.execute(query, context: context)
          expect(Payment.count).to eq(count)
        end
      end
    end
  end
end
