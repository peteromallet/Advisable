require 'rails_helper'

describe Accounts::RequestPasswordReset do
  before :each do
    email = double("Email")
    allow(email).to receive(:deliver_later)
    allow(AccountMailer).to receive(:reset_password).and_return(email)
  end

  it 'sets the reset_sent_at attribute' do
    specialist = create(:specialist, reset_sent_at: nil)
    Accounts::RequestPasswordReset.call(specialist.email)
    expect(specialist.reload.reset_sent_at).to_not be_nil
  end

  it 'sets the reset_digest attribute' do
    specialist = create(:specialist, reset_digest: nil)
    Accounts::RequestPasswordReset.call(specialist.email)
    expect(specialist.reload.reset_digest).to_not be_nil
  end

  it 'sends an email' do
    user = create(:user)
    email = double("Email")
    expect(email).to receive(:deliver_later)
    expect(AccountMailer).to receive(:reset_password).and_return(email)
    Accounts::RequestPasswordReset.call(user.email)
  end

  context "when the account has not set a password" do
    context "and the account is a specialist" do
      let(:specialist) { create(:specialist, password: nil) }

      it 'triggers the specialists.forgotten_password_for_non_account webhook' do
        expect(WebhookEvent).to receive(:trigger).with(
          "specialists.forgotten_password_for_non_account",
          WebhookEvent::Specialist.data(specialist)
        )

        expect {
          Accounts::RequestPasswordReset.call(specialist.email)
        }.to raise_error(Service::Error, "request_password_reset.application_required")
      end
    end
  end
end