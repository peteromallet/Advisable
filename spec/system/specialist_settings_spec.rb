require 'rails_helper'

RSpec.describe 'Specialist settings' do
  let!(:ireland) { create(:country, name: "Ireland") }
  let!(:germany) { create(:country, name: "Germany") }
  let(:specialist) { create(:specialist, city: nil, country: ireland, remote: false) }

  before :each do
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
  end

  it 'allows specialist to change their location' do
    authenticate_as specialist
    visit "/profile/location"
    fill_in 'city', with: "Dublin"
    select 'Germany', from: "country"
    click_on 'Save Changes'

    expect(page).to have_content('Your profile has been updated')
    expect(specialist.reload.city).to eq("Dublin")
    expect(specialist.reload.country).to eq(germany)
  end

  it 'allows specialist to change their email' do
    authenticate_as specialist
    visit "/profile"
    fill_in 'email', with: "update@test.com", fill_options: {clear: :backspace}
    click_on 'Save Changes'

    expect(page).to have_content('Your profile has been updated')
    expect(specialist.reload.account.email).to eq("update@test.com")
  end
end
