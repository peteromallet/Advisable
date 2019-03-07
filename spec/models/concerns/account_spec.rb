require 'rails_helper'

describe Account do
  describe "#find_by_uid" do
    context "when passed a user uid" do
      it "returns the user" do
        user = create(:user)
        expect(Account.find_by_uid(user.uid)).to eq(user)
      end
    end

    context "when passed a specialist uid" do
      it "returns the specialist" do
        user = create(:user)
        specialist = create(:specialist)
        expect(Account.find_by_uid(specialist.uid)).to eq(specialist)
      end
    end

    context "when there is no match" do
      it "returns nil" do
        expect(Account.find_by_uid("nope")).to be_nil
      end
    end
  end

  describe "#find_by_email" do
    context "when passed a user email" do
      it 'returns the user' do
        user = create(:user)
        expect(Account.find_by_email(user.email)).to eq(user)
      end
    end

    context "when passed a specialist email" do
      it 'returns the specialist' do
        specialist = create(:specialist)
        expect(Account.find_by_email(specialist.email)).to eq(specialist)
      end
    end

    context "when there is no match" do
      it "returns nil" do
        expect(Account.find_by_email("nope")).to be_nil
      end
    end
  end
end