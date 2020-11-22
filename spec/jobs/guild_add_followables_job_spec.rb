require "rails_helper"

RSpec.describe GuildAddFollowablesJob do
  subject(:enqueued_job) {
    described_class.perform_now(specialist.id)
  }

  let(:skill) { create(:skill, name: 'Marketing') }
  let(:specialist) { create(:specialist, skills: [skill]) }

  it "creates guild topic followables for the specialist" do
    guild_topic = create(:guild_topic, topicable: skill, name: skill.name)

    expect {
      enqueued_job
      specialist.reload
    }.to change { specialist.follows.count }.from(0).to(1)
    expect(specialist.follows.first.followable).to eq(guild_topic)
  end
end
