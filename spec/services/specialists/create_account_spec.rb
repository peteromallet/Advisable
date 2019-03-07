require "rails_helper"

describe Specialists::CreateAccount do
  before :each do
    airtable = double(Airtable::ClientContact)
    allow(Airtable::Specialist).to receive(:find).and_return(airtable)
    allow(airtable).to receive(:push)
  end

  context "When the specialist has not set a password yet" do
    it "sets their password" do
      specialist = create(:specialist, password: nil)
      expect(specialist.reload.password_digest).to be_nil
      Specialists::CreateAccount.call(specialist: specialist, email: specialist.email, password: "testing123", password_confirmation: "testing123")
      expect(specialist.reload.password_digest).to_not be_nil
    end

    context "when there is already a specialist with the given email" do
      it "has an email taken error" do
        specialist = create(:specialist, password: nil)
        new_specialist = create(:specialist, password: nil)
        expect {
          Specialists::CreateAccount.call(specialist: new_specialist, email: specialist.email, password: "testing123", password_confirmation: "testing123")
        }.to raise_error(Service::Error, 'email_taken')
      end
    end

    context "when there is already a user with the given email" do
      it "has an email taken error" do
        user = create(:user, password: nil)
        new_specialist = create(:user, password: nil)
        expect {
          Specialists::CreateAccount.call(specialist: new_specialist, email: user.email, password: "testing123", password_confirmation: "testing123")
        }.to raise_error(Service::Error, 'email_taken')
      end
    end
  end
end