require "rails_helper"

RSpec.describe Airtable::Specialist do
  include_examples "airtable syncing"
  include_examples "sync airtable association", "Country", to: :country
  let(:specialist) { create(:specialist) }

  describe "syncing the application stage" do
    let(:specialist) { create(:specialist, application_stage: nil) }
    let(:airtable) { Airtable::Specialist.new({
      "Application Stage" => "Applied",
      "Bank Holder Address" => "123 Bacon Street, Egg City, IE, 12345",
    }, id: specialist.airtable_id) }

    it 'triggers the application_stage_changed webhook event' do
      expect(WebhookEvent).to receive(:trigger).with(
        "specialists.application_stage_changed",
        hash_including(:application_stage => "Applied")
      )
      airtable.sync
    end

    context "when the record is a new record" do
      let(:airtable) { Airtable::Specialist.new({
        "Application Stage" => "Applied"
      }, id: "rec_new") }

      it "does not trigger a webhook" do
        expect(WebhookEvent).not_to receive(:trigger).with(
          "specialists.application_stage_changed",
          hash_including(:application_stage => "Applied")
        )
        airtable.sync
      end
    end

    context "when there is no change to the application_stage" do
      let(:specialist) { create(:specialist, application_stage: "Applied") }

      it "does not trigger a webhook" do
        expect(WebhookEvent).not_to receive(:trigger).with(
          "specialists.application_stage_changed",
          hash_including(:application_stage => "Applied")
        )
        airtable.sync
      end
    end
  end

  context "when 'Okay To Use Publicly' is Yes" do
    let(:specialist) { create(:specialist, public_use: nil) }
    let(:airtable) { Airtable::Specialist.new({
      "Okay To Use Publicly" => "Yes",
    }, id: specialist.airtable_id) }

    it "sets the public_use column to true" do
      expect { airtable.sync }.to change {
        specialist.reload.public_use
      }.from(nil).to(true)
    end
  end

  context "when 'Okay To Use Publicly' is No" do
    let(:specialist) { create(:specialist, public_use: nil) }
    let(:airtable) { Airtable::Specialist.new({
      "Okay To Use Publicly" => "No",
    }, id: specialist.airtable_id) }

    it "sets the public_use column to false" do
      expect { airtable.sync }.to change {
        specialist.reload.public_use
      }.from(nil).to(false)
    end
  end

  context "when there is a 'Typical Hourly Rate'" do
    let(:specialist) { create(:specialist, hourly_rate: nil) }
    let(:airtable) { Airtable::Specialist.new({
      "Typical Hourly Rate" => 87,
    }, id: specialist.airtable_id) }

    it "stores it as a minor currency" do
      expect { airtable.sync }.to change {
        specialist.reload.hourly_rate
      }.from(nil).to(87_00)
    end
  end

  describe "when there are 'Specialist Skills'" do
    let(:skill_a) { create(:skill) }
    let(:skill_b) { create(:skill) }
    let(:airtable) {
      Airtable::Specialist.new({
        "Specialist Skills" => [skill_a.airtable_id, skill_b.airtable_id],
      }, id: specialist.airtable_id)
    }

    it "associates each skill to the specialist" do
      expect(specialist.reload.skills).to_not include(skill_a)
      expect(specialist.reload.skills).to_not include(skill_b)
      airtable.sync
      expect(specialist.reload.skills).to include(skill_a)
      expect(specialist.reload.skills).to include(skill_b)
    end

    context 'when the skill has not already been synced' do
      let(:airtable) {
        Airtable::Specialist.new({
          "Specialist Skills" => ["recNewSkill"],
        }, id: specialist.airtable_id)
      }

      it 'syncs it first' do
        airtable_skill = double(Airtable::Skill)
        expect(Airtable::Skill).to receive(:find).with("recNewSkill").and_return(airtable_skill)
        expect(airtable_skill).to receive(:sync)
        airtable.sync
      end
    end
  end

  describe "push_data" do
    let(:specialist) { create(:specialist, {
      bio: "bio",
      city: "Dublin"
    }) }
    let(:airtable) { Airtable::Specialist.new({}, id: specialist.airtable_id) }

    before :each do
      allow(airtable).to receive(:save)
    end

    it "syncs the bio" do
      expect { airtable.push(specialist) }.to change {
        airtable.fields['Biography']
      }.from(nil).to(specialist.bio)
    end

    it "syncs the email" do
      expect { airtable.push(specialist) }.to change {
        airtable.fields['Email Address']
      }.from(nil).to(specialist.email)
    end

    it "syncs the city" do
      expect { airtable.push(specialist) }.to change {
        airtable.fields['City']
      }.from(nil).to(specialist.city)
    end

    context 'when the "remote" column is true' do
      let(:specialist) { create(:specialist, remote: true) }

      it "sets the 'Remote Ok' column" do
        expect { airtable.push(specialist) }.to change {
          airtable.fields['Remote OK']
        }.from(nil).to("Yes, I'm happy to work remote")
      end
    end

    context "when the 'primarily_freelance' column has been set" do
      context "and is true" do
        let(:specialist) { create(:specialist, primarily_freelance: true) }

        it "sets 'Freelancing Status' column to primarily freelance" do
          expect { airtable.push(specialist) }.to change {
            airtable.fields['Freelancing Status']
          }.from(nil).to("Yes, freelancing is my primary occupation")
        end
      end

      context "and is false" do
        let(:specialist) { create(:specialist, primarily_freelance: false) }

        it "sets 'Freelancing Status' column to part-time freelance" do
          expect { airtable.push(specialist) }.to change {
            airtable.fields['Freelancing Status']
          }.from(nil).to("No, I freelance alongside a full-time job")
        end
      end
    end

    context "when the public_use column has been set" do
      context "and is true" do
        let(:specialist) { create(:specialist, public_use: true) }

        it "syncs 'Okay To Use Publicly' as Yes" do
          expect { airtable.push(specialist) }.to change {
            airtable.fields['Okay To Use Publicly']
          }.from(nil).to("Yes")
        end
      end

      context "and is false" do
        let(:specialist) { create(:specialist, public_use: false) }

        it "syncs 'Okay To Use Publicly' as No" do
          expect { airtable.push(specialist) }.to change {
            airtable.fields['Okay To Use Publicly']
          }.from(nil).to("No")
        end
      end
    end

    context "when there is an hourly_rate" do
      let(:specialist) { create(:specialist, hourly_rate: 76_00) }

      it 'syncs it as a non minor currency' do
        expect { airtable.push(specialist) }.to change {
          airtable.fields['Typical Hourly Rate']
        }.from(nil).to(76)
      end
    end

    context "when the specialist has an account" do
      it "sets 'Account Created' to 'Yes'" do
        specialist.update(password: "testing123")
        expect { airtable.push(specialist) }.to change {
          airtable.fields['Account Created']
        }.from(nil).to("Yes")
      end
    end
  end

  describe "Whe Airtable responds with an error" do
    let(:airtable) { Airtable::Specialist.new({}, id: specialist.airtable_id) }
    let(:error) {
      Airrecord::Error.new("HTTP 422: ROW_DOES_NOT_EXIST: Record ID rec1234 does not exist")
    }

    it "raises and error" do
      error = Airrecord::Error.new("Some unrelated error")
      expect(airtable).to receive(:save).and_raise(error)
      expect { airtable.push(specialist) }.to raise_error(error)
    end

    context "and the error contains ROW_DOES_NOT_EXIST" do
      context "and the id relates to a skill in postgres" do
        let!(:skill) { create(:skill, airtable_id: "rec1234") }

        it "calls #handle_duplicate_skill" do
          # First time its called we raise the error as if airtable responded
          # with ROW_DOES_NOT_EXIST
          expect(airtable).to receive(:save).and_raise(error)
          # Second time its called we allow it as if airtable responded 200
          expect(airtable).to receive(:save).and_return(true)
          expect(airtable).to receive(:handle_duplicate_skill).and_return(true)
          airtable.push(specialist)
        end

        context "and for some reason airtable keeps responding with 422" do
          it "prevents going into an infinite loop by retrying 5 times then just raising the error" do
            expect(airtable).to receive(:save).exactly(6).times.and_raise(error)
            expect(airtable).to receive(:handle_duplicate_skill).exactly(5).times.and_return(true)
            expect {
              airtable.push(specialist)
            }.to raise_error(error)
          end
        end
      end

      context "and the id does not relate to a skill in postgres" do
        it "does not call #handle_duplicate_skill and reraises the error" do
          expect(airtable).to receive(:save).and_raise(error)
          expect(airtable).to_not receive(:handle_duplicate_skill)
          expect {
            airtable.push(specialist)
          }.to raise_error(error)
        end
      end
    end
  end

  describe "#handle_duplicate_skills" do
    let(:skill) { create(:skill) }
    let(:airtable) { Airtable::Specialist.new({}, id: specialist.airtable_id) }

    before :each do
      specialist.skills << skill
    end

    context "when there is no duplicate skill in postgres" do
      it "syncs the skill to airtable" do
        expect(skill).to receive(:sync_to_airtable)
        airtable.handle_duplicate_skill(skill, specialist)
      end
    end

    context "when a duplicate skill exists in postgres" do
      let!(:skill_b) { create(:skill, name: skill.name, original: nil) }

      it "replaces the duplicate with the correct skill" do
        expect {
          airtable.handle_duplicate_skill(skill, specialist)
        }.to change {
          specialist.reload.skills.first.id
        }.from(skill.id).to(skill_b.id)
      end
    end

    context "when multiple duplicates exist in postgres" do
      let!(:original) { create(:skill, name: skill.name, original: nil) }
      let!(:skill_b) { create(:skill, name: skill.name, original: original) }

      it "associates the duplicate to the original" do
        expect {
          airtable.handle_duplicate_skill(skill, specialist)
        }.to change {
          specialist.reload.skills.first.id
        }.from(skill.id).to(original.id)
      end
    end
  end
end