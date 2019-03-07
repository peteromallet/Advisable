require 'rails_helper'

describe Users::Signup do
  before :each do
    airtable = double(Airtable::ClientContact)
    allow(Airtable::ClientContact).to receive(:find).and_return(airtable)
    allow(airtable).to receive(:push)
  end

  context "When the user has not set a password yet" do
    it "sets their password" do
      user = create(:user, password: nil)
      expect(user.reload.password_digest).to be_nil
      Users::Signup.call(id: user.airtable_id, email: user.email, password: "testing123", password_confirmation: "testing123")
      expect(user.reload.password_digest).to_not be_nil
    end

    context "when there is already a user with the given email" do
      it "has an email taken error" do
        user = create(:user, password: nil)
        new_user = create(:user, password: nil)
        expect {
          Users::Signup.call(id: new_user.airtable_id, email: user.email, password: "testing123", password_confirmation: "testing123")
        }.to raise_error(Service::Error, 'email_taken')
      end
    end

    context "when there is already a specialist with the given email" do
      it "has an email taken error" do
        specialist = create(:specialist, password: nil)
        new_user = create(:user, password: nil)
        expect {
          Users::Signup.call(id: new_user.airtable_id, email: specialist.email, password: "testing123", password_confirmation: "testing123")
        }.to raise_error(Service::Error, 'email_taken')
      end
    end
  end
end