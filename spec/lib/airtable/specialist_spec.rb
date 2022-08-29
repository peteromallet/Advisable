# frozen_string_literal: true

require "rails_helper"

RSpec.describe Airtable::Specialist do
  let(:specialist) { create(:specialist) }

  include_examples "airtable syncing"

  describe "unsubscriptions" do
    let(:account) { create(:account) }
    let(:specialist) { create(:specialist, account:) }
    let(:fields) { {"Email Address" => "test@airtable.com", "Unsubscribe - Marketing Emails" => "Yes", "Unsubscribe - Onboarding Emails" => "Yes"} }
    let(:airtable) { described_class.new(fields, id: specialist.airtable_id) }

    context "when syncing to airtable" do
      let(:account) { create(:account, unsubscribed_from: ["SMS Alerts"]) }

      before { allow(airtable).to receive(:save) }

      it "syncs over unsubscriptions to account" do
        expect(airtable.fields["Unsubscribe - SMS Alerts"]).to be_nil
        airtable.push(specialist)
        expect(airtable.fields["Unsubscribe - SMS Alerts"]).to eq("Yes")
      end
    end
  end

  describe "push_data" do
    let(:specialist) do
      create(:specialist, {
        bio: "bio",
        city: "Dublin"
      })
    end
    let(:airtable) { described_class.new({}, id: specialist.airtable_id) }

    before do
      allow(airtable).to receive(:save)
    end

    it "syncs the bio" do
      expect { airtable.push(specialist) }.to change {
        airtable.fields["Biography"]
      }.from(nil).to(specialist.bio)
    end

    it "syncs the email" do
      expect { airtable.push(specialist) }.to change {
        airtable.fields["Email Address"]
      }.from(nil).to(specialist.account.email)
    end

    it "syncs the city" do
      expect { airtable.push(specialist) }.to change {
        airtable.fields["City"]
      }.from(nil).to(specialist.city)
    end

    context 'when the "remote" column is true' do
      let(:specialist) { create(:specialist, remote: true) }

      it "sets the 'Remote Ok' column" do
        expect { airtable.push(specialist) }.to change {
          airtable.fields["Remote OK"]
        }.from(nil).to("Yes, I'm happy to work remote")
      end
    end

    context "when the 'primarily_freelance' column has been set" do
      context "when it is true" do
        let(:specialist) { create(:specialist, primarily_freelance: true) }

        it "sets 'Freelancing Status' column to primarily freelance" do
          expect { airtable.push(specialist) }.to change {
            airtable.fields["Freelancing Status"]
          }.from(nil).to("Yes, freelancing is my primary occupation")
        end
      end

      context "when it is false" do
        let(:specialist) { create(:specialist, primarily_freelance: false) }

        it "sets 'Freelancing Status' column to part-time freelance" do
          expect { airtable.push(specialist) }.to change {
            airtable.fields["Freelancing Status"]
          }.from(nil).to("No, I freelance alongside a full-time job")
        end
      end
    end

    context "when the public_use column has been set" do
      context "when it is true" do
        let(:specialist) { create(:specialist, public_use: true) }

        it "syncs 'Okay To Use Publicly' as Yes" do
          expect { airtable.push(specialist) }.to change {
            airtable.fields["Okay To Use Publicly"]
          }.from(nil).to("Yes")
        end
      end

      context "when it is false" do
        let(:specialist) { create(:specialist, public_use: false) }

        it "syncs 'Okay To Use Publicly' as No" do
          expect { airtable.push(specialist) }.to change {
            airtable.fields["Okay To Use Publicly"]
          }.from(nil).to("No")
        end
      end
    end

    context "when the specialist has an account" do
      it "sets 'Account Created' to 'Yes'" do
        specialist.account.update(password: "testing123")
        expect { airtable.push(specialist) }.to change {
          airtable.fields["Account Created"]
        }.from(nil).to("Yes")
      end
    end
  end

  describe "Whe Airtable responds with an error" do
    let(:airtable) { described_class.new({}, id: specialist.airtable_id) }
    let(:error) do
      Airrecord::Error.new("HTTP 422: ROW_DOES_NOT_EXIST: Record ID rec1234 does not exist")
    end

    it "raises and error" do
      error = Airrecord::Error.new("Some unrelated error")
      allow(airtable).to receive(:save).and_raise(error)
      expect { airtable.push(specialist) }.to raise_error(error)
    end

    context "when the error contains ROW_DOES_NOT_EXIST" do
      context "when the id relates to a skill in postgres" do
        before { create(:skill, airtable_id: "rec1234") }

        it "calls #handle_duplicate_skill" do
          # First time its called we raise the error as if airtable responded
          # with ROW_DOES_NOT_EXIST
          allow(airtable).to receive(:save).and_raise(error)
          # Second time its called we allow it as if airtable responded 200
          allow(airtable).to receive(:save).and_return(true)
          allow(airtable).to receive(:handle_duplicate_skill).and_return(true)
          airtable.push(specialist)
        end

        context "when for some reason airtable keeps responding with 422" do
          it "prevents going into an infinite loop by retrying 5 times then just raising the error" do
            expect(airtable).to receive(:save).exactly(6).times.and_raise(error)
            expect(airtable).to receive(:handle_duplicate_skill).exactly(5).times.and_return(true)
            expect do
              airtable.push(specialist)
            end.to raise_error(error)
          end
        end
      end

      context "when the id does not relate to a skill in postgres" do
        it "does not call #handle_duplicate_skill and reraises the error" do
          allow(airtable).to receive(:save).and_raise(error)
          expect(airtable).not_to receive(:handle_duplicate_skill)
          expect do
            airtable.push(specialist)
          end.to raise_error(error)
        end
      end
    end
  end

  describe "#handle_duplicate_skills" do
    let(:skill) { create(:skill) }
    let(:airtable) { described_class.new({}, id: specialist.airtable_id) }

    before do
      specialist.skills << skill
    end

    context "when there is no duplicate skill in postgres" do
      it "syncs the skill to airtable" do
        expect(skill).to receive(:sync_to_airtable)
        airtable.handle_duplicate_skill(skill, specialist)
      end
    end

    context "when a duplicate skill exists in postgres" do
      let!(:skill_b) { create(:skill, name: skill.name) }

      it "replaces the duplicate with the correct skill" do
        expect do
          airtable.handle_duplicate_skill(skill, specialist)
        end.to change {
          specialist.reload.skills.first.id
        }.from(skill.id).to(skill_b.id)

        expect(Skill.where(id: skill.id)).to eq([])
      end
    end

    context "when multiple duplicates exist in postgres" do
      let!(:original) { create(:skill, name: skill.name) }

      before { create(:skill, name: skill.name) }

      it "associates the duplicate to the original" do
        expect do
          airtable.handle_duplicate_skill(skill, specialist)
        end.to change {
          specialist.reload.skills.first.id
        }.from(skill.id).to(original.id)

        expect(Skill.where(id: skill.id)).to eq([])
      end
    end
  end
end
