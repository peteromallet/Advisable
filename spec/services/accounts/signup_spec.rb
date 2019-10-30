require 'rails_helper'

describe Accounts::Signup do
  before :each do
    airtable = double(Airtable::ClientContact)
    allow(Airtable::ClientContact).to receive(:find).and_return(airtable)
    allow(airtable).to receive(:push)

    specialist = double(Airtable::Specialist)
    allow(Airtable::Specialist).to receive(:find).and_return(specialist)
    allow(specialist).to receive(:push)
  end

  context "When the user has not set a password yet" do
    it "sets their password" do
      user = create(:user, password: nil)
      expect(user.reload.password_digest).to be_nil
      Accounts::Signup.call(airtable_id: user.airtable_id, email: user.email, password: "testing123", password_confirmation: "testing123")
      expect(user.reload.password_digest).to_not be_nil
    end

    context "when there is already a user with the given email" do
      it "has an email taken error" do
        user = create(:user, password: nil)
        new_user = create(:user, password: nil)
        expect {
          Accounts::Signup.call(airtable_id: new_user.airtable_id, email: user.email, password: "testing123", password_confirmation: "testing123")
        }.to raise_error(Service::Error, /used by another account/)
      end
    end

    context "when there is already a specialist with the given email" do
      it "has an email taken error" do
        specialist = create(:specialist, password: nil)
        new_user = create(:user, password: nil)
        expect {
          Accounts::Signup.call(airtable_id: new_user.airtable_id, email: specialist.email, password: "testing123", password_confirmation: "testing123")
        }.to raise_error(Service::Error, /used by another account/)
      end
    end
  end

  context "when the account is a specialist" do
    it "sets their password" do
      specialist = create(:specialist, password: nil)
      expect(specialist.reload.password_digest).to be_nil
      Accounts::Signup.call(airtable_id: specialist.airtable_id, email: specialist.email, password: "testing123", password_confirmation: "testing123")
      expect(specialist.reload.password_digest).to_not be_nil
    end
  end
end