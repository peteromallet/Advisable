# frozen_string_literal: true

require "rails_helper"

RSpec.describe GuildAddFollowablesJob do
  subject(:enqueued_job) do
    described_class.perform_now(specialist.id)
  end

  let(:skill) { create(:skill, name: "Marketing") }
  let(:specialist) { create(:specialist, skills: [skill]) }
  let!(:label) { create(:label, skill:, name: skill.name) }

  it "creates label followables for the specialist" do
    expect do
      enqueued_job
      specialist.reload
    end.to change { specialist.subscriptions.count }.from(0).to(1)
    expect(specialist.subscriptions.first.label).to eq(label)
  end
end
