require "rails_helper"

RSpec.describe Specialists::UpdateProfile do
  let(:account) { create(:account) }
  let(:specialist) { create(:specialist, remote: false) }

  before do
    allow(specialist).to receive(:sync_to_airtable)
  end

  it "sets the specialist bio" do
    expect {
      described_class.call(
        specialist: specialist,
        attributes: {bio: "changed"}
      )
    }.to change { specialist.reload.bio }.from(specialist.bio).to("changed")
  end

  it 'sets the city' do
    expect {
      described_class.call(
        specialist: specialist,
        attributes: {city: "Berlin"}
      )
    }.to change { specialist.reload.city }.from(specialist.city).to("Berlin")
  end

  it 'sets the remote attribute' do
    expect {
      described_class.call(
        specialist: specialist,
        attributes: {remote: true}
      )
    }.to change { specialist.reload.remote }.from(false).to(true)
  end

  it 'sets the specialists skills' do
    a = create(:skill, name: "Marketing")
    b = create(:skill, name: "Testing")
    described_class.call(
      specialist: specialist,
      attributes: {skills: ['Marketing', 'Testing']}
    )
    expect(specialist.reload.skills).to include(a)
    expect(specialist.reload.skills).to include(b)
  end

  it 'sets the specialists country' do
    country = create(:country, name: "Germany")
    described_class.call(
      specialist: specialist,
      attributes: {country: country.uid}
    )
    expect(specialist.reload.country).to eq(country)
  end

  it 'calls #sync_to_airtable' do
    expect(specialist).to receive(:sync_to_airtable) # rubocop:disable RSpec/MessageSpies
    described_class.call(
      specialist: specialist,
      attributes: {bio: "Testing"}
    )
  end

  it 'returns the specialist' do
    result = described_class.call(
      specialist: specialist,
      attributes: {bio: "Testing"}
    )
    expect(result).to be_a(Specialist)
  end

  it 'saves the responsible person' do
    result = described_class.call(
      specialist: specialist,
      attributes: {bio: "Testing"},
      responsible: account
    )
    result.reload_log_data
    expect(result.log_data.responsible_id).to eq(account.id)
  end
end
