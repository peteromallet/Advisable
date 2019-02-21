require 'rails_helper'

describe Accounts::RequestPasswordReset do
  before :each do
    email = double("Email")
    allow(email).to receive(:deliver_later)
    allow(AccountMailer).to receive(:reset_password).and_return(email)
  end

  it 'sets the reset_sent_at attribute' do 
    specialist = create(:specialist, reset_sent_at: nil)
    Accounts::RequestPasswordReset.call(specialist)
    expect(specialist.reset_sent_at).to_not be_nil
  end

  it 'sets the reset_digest attribute' do 
    specialist = create(:specialist, reset_digest: nil)
    Accounts::RequestPasswordReset.call(specialist)
    expect(specialist.reset_digest).to_not be_nil
  end

  it 'sends an email' do
    user = create(:user)
    email = double("Email")
    expect(email).to receive(:deliver_later)
    expect(AccountMailer).to receive(:reset_password).and_return(email)
    Accounts::RequestPasswordReset.call(user)
  end
end