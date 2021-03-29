# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::ApproveTask do
  let(:task) { create(:task, stage: 'Submitted', name: "Harder, Better, Faster, Stronger.") }

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
    allow_any_instance_of(Task).to receive(:sync_to_airtable)
  end

  it "sets the stage to 'Approved'" do
    response = AdvisableSchema.execute(query, context: context)
    stage = response['data']['approveTask']['task']['stage']
    expect(stage).to eq('Approved')
  end

  it "creates an invoice line item" do
    AdvisableSchema.execute(query, context: context)
    expect(Stripe::CreateInvoiceLineItemJob).to have_been_enqueued
    invoice = task.application.invoices.draft.first
    expect(invoice).not_to be_nil
    line_item = invoice.line_items.first
    expect(line_item).not_to be_nil
    expect(line_item.task_id).to eq(task.id)
    expect(line_item.name).to eq("Harder, Better, Faster, Stronger.")
  end

  context "when the user doesn't have access to the project" do
    let(:context) { {current_user: create(:user)} }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('notAuthorized')
    end
  end

  context 'when there is no user' do
    let(:context) { {current_user: nil} }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('notAuthorized')
    end
  end

  context 'when the specialist is logged in' do
    let(:context) { {current_user: task.application.specialist} }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('notAuthorized')
    end
  end

  context "when the task stage is not Submitted" do
    let(:task) { create(:task, stage: "Assigned") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("tasks.statusNotSubmitted")
    end
  end
end
