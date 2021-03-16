# frozen_string_literal: true

require "rails_helper"

RSpec.describe GuildAddFollowablesJob do
  subject(:enqueued_job) do
    described_class.perform_now(specialist.id)
  end

  let(:skill) { create(:skill, name: 'Marketing') }
  let(:specialist) { create(:specialist, skills: [skill]) }
  let!(:label) { create(:label, skill: skill, name: skill.name) }
  let!(:guild_topic) { create(:guild_topic, topicable: skill, name: skill.name) }

  it "creates guild topic followables for the specialist" do
    expect do
      enqueued_job
      specialist.reload
    end.to change { specialist.subscriptions.on_tag.count }.from(0).to(1).
      and change { specialist.subscriptions.on_label.count }.from(0).to(1)
    expect(specialist.subscriptions.on_tag.first.tag).to eq(guild_topic)
    expect(specialist.subscriptions.on_label.first.label).to eq(label)
  end
end
