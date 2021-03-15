# frozen_string_literal: true

require "rails_helper"

RSpec.describe GuildAddFollowablesJob do
  subject(:enqueued_job) do
    described_class.perform_now(specialist.id)
  end

  let(:skill) { create(:skill, name: 'Marketing') }
  let(:specialist) { create(:specialist, skills: [skill]) }

  it "creates guild topic followables for the specialist" do
    guild_topic = create(:guild_topic, topicable: skill, name: skill.name)

    expect do
      enqueued_job
      specialist.reload
    end.to change { specialist.subscriptions.count }.from(0).to(1)
    expect(specialist.subscriptions.first.tag).to eq(guild_topic)
  end
end
