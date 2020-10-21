require 'rails_helper'

RSpec.describe Accounts::RequestPasswordReset do
  before :each do
    email = double("Email")
    allow(email).to receive(:deliver_later)
    allow(AccountMailer).to receive(:reset_password).and_return(email)
  end

  it 'sets the reset_sent_at attribute' do
    specialist = create(:specialist, account: create(:account, reset_sent_at: nil))
    Accounts::RequestPasswordReset.call(specialist.account.email)
    expect(specialist.reload.account.reset_sent_at).to_not be_nil
  end

  it 'sets the reset_digest attribute' do
    specialist = create(:specialist, account: create(:account, reset_digest: nil))
    Accounts::RequestPasswordReset.call(specialist.account.email)
    expect(specialist.reload.account.reset_digest).to_not be_nil
  end

  it 'sends an email' do
    user = create(:user)
    email = double("Email")
    expect(email).to receive(:deliver_later)
    expect(AccountMailer).to receive(:reset_password).and_return(email)
    Accounts::RequestPasswordReset.call(user.account.email)
  end

  context "when the account has not set a password" do
    context "and the account is a specialist" do
      let(:account) { create(:account, password: nil) }
      let(:specialist) { create(:specialist, account: account) }

      it 'triggers the specialists.forgotten_password_for_non_account webhook' do
        expect(WebhookEvent).to receive(:trigger).with(
          "specialists.forgotten_password_for_non_account",
          WebhookEvent::Specialist.data(specialist)
        )

        expect {
          Accounts::RequestPasswordReset.call(specialist.account.email)
        }.to raise_error(Service::Error, "request_password_reset.application_required")
      end
    end
  end
end
