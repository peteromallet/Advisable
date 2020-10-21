require 'rails_helper'

RSpec.describe SpecialistOrUser do
  describe "#find_by_uid" do
    context "when passed a user uid" do
      it "returns the user" do
        user = create(:user)
        expect(SpecialistOrUser.find_by_uid(user.uid)).to eq(user)
      end
    end

    context "when passed a specialist uid" do
      it "returns the specialist" do
        user = create(:user)
        specialist = create(:specialist)
        expect(SpecialistOrUser.find_by_uid(specialist.uid)).to eq(specialist)
      end
    end

    context "when there is no match" do
      it "returns nil" do
        expect(SpecialistOrUser.find_by_uid("nope")).to be_nil
      end
    end
  end

  describe "#find_by_uid!" do
    context "when the account exists" do
      it "returns the account" do
        user = create(:user)
        expect(SpecialistOrUser.find_by_uid!(user.uid)).to eq(user)
      end
    end

    context "when the account doesnt exist" do
      it "raises an error" do
        expect {
          SpecialistOrUser.find_by_uid!("doesntexist")
        }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end

  describe "#find_by_email" do
    context "when passed a user email" do
      it 'returns the user' do
        user = create(:user)
        expect(SpecialistOrUser.find_by_email(user.account.email)).to eq(user)
      end
    end

    context "when passed a specialist email" do
      it 'returns the specialist' do
        specialist = create(:specialist)
        expect(SpecialistOrUser.find_by_email(specialist.account.email)).to eq(specialist)
      end
    end

    context "when there is no match" do
      it "returns nil" do
        expect(SpecialistOrUser.find_by_email("nope")).to be_nil
      end
    end
  end

  describe "#find_by_email!" do
    context "when the account exists" do
      it "returns the account" do
        user = create(:user)
        expect(SpecialistOrUser.find_by_email!(user.account.email)).to eq(user)
      end
    end

    context "when the account doesnt exist" do
      it "raises an error" do
        expect {
          SpecialistOrUser.find_by_email!("doesntexist")
        }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end

  describe "#find_by_airtable_id" do
    context "when passed a user airtable_id" do
      it "returns the user" do
        user = create(:user)
        expect(SpecialistOrUser.find_by_airtable_id(user.airtable_id)).to eq(user)
      end
    end

    context "when passed a specialist airtable_id" do
      it "returns the specialist" do
        user = create(:user)
        specialist = create(:specialist)
        expect(SpecialistOrUser.find_by_airtable_id(specialist.airtable_id)).to eq(specialist)
      end
    end

    context "when there is no match" do
      it "returns nil" do
        expect(SpecialistOrUser.find_by_airtable_id("nope")).to be_nil
      end
    end
  end

  describe "#find_by_airtable_id!" do
    context "when the account exists" do
      it "returns the account" do
        user = create(:user)
        expect(SpecialistOrUser.find_by_airtable_id!(user.airtable_id)).to eq(user)
      end
    end

    context "when the account doesnt exist" do
      it "raises an error" do
        expect {
          SpecialistOrUser.find_by_airtable_id!("doesntexist")
        }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
