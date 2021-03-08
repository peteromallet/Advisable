# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::SubmitTask do
  let(:application) { create(:application, status: 'Working') }
  let(:task) { create(:task, stage: 'Working', application: application, name: "Harder, Better, Faster, Stronger.") }

  let(:query) do
    <<-GRAPHQL
    mutation {
      submitTask(input: {
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

  before do
    allow_any_instance_of(Task).to receive(:sync_to_airtable)
  end

  it "sets the stage to 'Submitted'" do
    response = AdvisableSchema.execute(query, context: context)
    stage = response['data']['submitTask']['task']['stage']
    expect(stage).to eq('Submitted')
  end

  it "creates an invoice line item" do
    AdvisableSchema.execute(query, context: context)
    expect(Stripe::CreateInvoiceLineItemJob).to have_been_enqueued
    invoice = application.invoices.draft.first
    expect(invoice).not_to be_nil
    line_item = invoice.line_items.first
    expect(line_item).not_to be_nil
    expect(line_item.task_id).to eq(task.id)
    expect(line_item.name).to eq("Harder, Better, Faster, Stronger.")
  end

  context "when the specialist doesn't have access to the project" do
    let(:context) { {current_user: create(:specialist)} }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]
      expect(error['extensions']['code']).to eq('notAuthorized')
    end
  end

  context 'when there is no user' do
    let(:context) { {current_user: nil} }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]
      expect(error['extensions']['code']).to eq('notAuthorized')
    end
  end

  context 'when the client is logged in' do
    let(:context) { {current_user: task.application.project.user} }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]
      expect(error['extensions']['code']).to eq('notAuthorized')
    end
  end

  context 'when the task stage is Quote Provided' do
    let(:task) { create(:task, stage: 'Quote Provided') }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]
      expect(error['extensions']['code']).to eq('tasks.notSubmittable')
    end
  end

  context 'when the task stage is Submitted' do
    let(:task) { create(:task, stage: 'Submitted') }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]
      expect(error['extensions']['code']).to eq('tasks.notSubmittable')
    end
  end

  context "when the application status is not 'Working'" do
    let(:application) { create(:application, status: 'Proposed') }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]
      expect(error['message']).to eq("Application status is not 'Working'")
    end
  end
end
