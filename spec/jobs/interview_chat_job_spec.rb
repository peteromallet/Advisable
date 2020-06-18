require 'rails_helper'

Rails.describe InterviewChatJob do
  let(:vcr_cassette) { 'talkjs_chat' }
  let(:sales_person) do
    FactoryBot.create(
      :sales_person,
      first_name: 'Sales',
      airtable_id: 'sp+talkjs@advisable.com'
    )
  end
  let(:user) do
    FactoryBot.create(
      :user,
      first_name: 'User',
      airtable_id: 'u+talkjs@advisable.com',
      sales_person: sales_person
    )
  end
  let(:specialist) do
    FactoryBot.create(
      :specialist,
      first_name: 'Specialist',
      airtable_id: 's+talkjs@advisable.com'
    )
  end
  let(:interview) do
    FactoryBot.create(
      :interview,
      user: user,
      specialist: specialist,
      airtable_id: 'i+talkjs@advisable.com'
    )
  end

  before do
    VCR.insert_cassette(vcr_cassette)
  end

  after { VCR.eject_cassette(vcr_cassette) }

  describe '#perform' do
    it do
      response = InterviewChatJob.perform_now(interview)
      expect(response.body).to eq('{}')
    end
  end
end
