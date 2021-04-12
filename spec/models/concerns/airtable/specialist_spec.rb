# frozen_string_literal: true

require "rails_helper"

RSpec.describe Airtable::Specialist do
  let(:specialist) { create(:specialist) }

  include_examples "airtable syncing", fields: {"Email Address" => Faker::Internet.email}
  include_examples "sync airtable association", "Country", to: :country, fields: {"Email Address" => Faker::Internet.email}

  include_examples("sync airtable columns to association", {
    association: :account,
    columns: [
      {from: "Email Address", to: :email, with: "test@test.com"},
      {from: "First Name", to: :first_name, with: "John"},
      {from: "Last Name", to: :last_name, with: "Snow"}
    ]
  })

  describe "syncing the application stage" do
    let(:specialist) { create(:specialist, application_stage: nil) }
    let(:airtable) do
      described_class.new({
        "Email Address" => "test@airtable.com",
        "Application Stage" => "Started",
        "Bank Holder Address" => "123 Bacon Street, Egg City, IE, 12345"
      }, id: specialist.airtable_id)
    end

    it 'triggers the application_stage_changed webhook event' do
      expect(WebhookEvent).to receive(:trigger).with(
        "specialists.application_stage_changed",
        hash_including(application_stage: "Started")
      )
      airtable.sync
    end

    context "when updated_at is fresher than sync_started_at" do
      it 'does not change data nor triggers the application_stage_changed webhook event' do
        old_email = specialist.account.email
        expect(WebhookEvent).not_to receive(:trigger).with(
          "specialists.application_stage_changed",
          hash_including(application_stage: "Started")
        )

        airtable.sync(started_at: 5.minutes.ago)
        expect(specialist.account.reload.email).to eq(old_email)
      end
    end

    context "when the record is a new record" do
      let(:airtable) do
        described_class.new({
          "Application Stage" => "Started"
        }, id: "rec_new")
      end

      it "does not trigger a webhook" do
        expect(WebhookEvent).not_to receive(:trigger).with(
          "specialists.application_stage_changed",
          hash_including(application_stage: "Started")
        )
        airtable.sync(started_at: 5.minutes.ago)
      end
    end

    context "when there is no change to the application_stage" do
      let(:specialist) { create(:specialist, application_stage: "Started") }

      it "does not trigger a webhook" do
        expect(WebhookEvent).not_to receive(:trigger).with(
          "specialists.application_stage_changed",
          hash_including(application_stage: "Started")
        )
        airtable.sync
      end
    end
  end

  context "when 'Okay To Use Publicly' is Yes" do
    let(:specialist) { create(:specialist, public_use: nil) }
    let(:airtable) do
      described_class.new({
        "Email Address" => "test@airtable.com",
        "Okay To Use Publicly" => "Yes"
      }, id: specialist.airtable_id)
    end

    it "sets the public_use column to true" do
      expect { airtable.sync }.to change {
        specialist.reload.public_use
      }.from(nil).to(true)
    end
  end

  context "when 'Okay To Use Publicly' is No" do
    let(:specialist) { create(:specialist, public_use: nil) }
    let(:airtable) do
      described_class.new({
        "Okay To Use Publicly" => "No",
        "Email Address" => "test@airtable.com"
      }, id: specialist.airtable_id)
    end

    it "sets the public_use column to false" do
      expect { airtable.sync }.to change {
        specialist.reload.public_use
      }.from(nil).to(false)
    end
  end

  context "when there is a 'Typical Hourly Rate'" do
    let(:specialist) { create(:specialist, hourly_rate: nil) }
    let(:airtable) do
      described_class.new({
        "Email Address" => "test@airtable.com",
        "Typical Hourly Rate" => 87
      }, id: specialist.airtable_id)
    end

    it "stores it as a minor currency" do
      expect { airtable.sync }.to change {
        specialist.reload.hourly_rate
      }.from(nil).to(87_00)
    end
  end

  describe "when there are 'Specialist Skills'" do
    let(:skill_a) { create(:skill) }
    let(:skill_b) { create(:skill) }
    let(:airtable) do
      described_class.new({
        "Email Address" => "test@airtable.com",
        "Specialist Skills" => [skill_a.airtable_id, skill_b.airtable_id]
      }, id: specialist.airtable_id)
    end

    it "associates each skill to the specialist" do
      expect(specialist.reload.skills).not_to include(skill_a)
      expect(specialist.reload.skills).not_to include(skill_b)
      airtable.sync
      expect(specialist.reload.skills).to include(skill_a)
      expect(specialist.reload.skills).to include(skill_b)
    end

    context 'when the skill has not already been synced' do
      let(:airtable) do
        described_class.new({
          "Email Address" => "test@airtable.com",
          "Specialist Skills" => ["recNewSkill"]
        }, id: specialist.airtable_id)
      end

      it 'syncs it first' do
        airtable_skill = instance_double(Airtable::Skill)
        allow(Airtable::Skill).to receive(:find).with("recNewSkill").and_return(airtable_skill)
        expect(airtable_skill).to receive(:sync)
        airtable.sync
      end
    end
  end

  describe "value stripping" do
    let(:specialist) { create(:specialist) }
    let(:airtable) do
      described_class.new({
        "Email Address" => " test@airtable.com ",
        "First Name" => " Dwight ",
        "Last Name" => " Schrute ",
        "VAT Number" => " 1234 "
      }, id: specialist.airtable_id)
    end

    it "strips association attributes" do
      airtable.sync
      specialist.reload
      expect(specialist.vat_number).to eq(" 1234 ")
      attributes = specialist.account.attributes.slice("email", "first_name", "last_name").map(&:second)
      expect(attributes).to match_array(["Dwight", "Schrute", "test@airtable.com"])
    end
  end

  describe "unsubscriptions" do
    let(:account) { create(:account) }
    let(:specialist) { create(:specialist, account: account) }
    let(:fields) { {"Email Address" => "test@airtable.com", "Unsubscribe - Marketing Emails" => "Yes", "Unsubscribe - Onboarding Emails" => "Yes"} }
    let(:airtable) { described_class.new(fields, id: specialist.airtable_id) }

    context "when syncing to airtable" do
      it "syncs over unsubscriptions to account" do
        expect(account.reload.unsubscribed_from).to eq([])
        airtable.sync
        expect(account.reload.unsubscribed_from).to match_array(["Marketing Emails", "Onboarding Emails"])
      end
    end

    context "when syncing from airtable" do
      let(:account) { create(:account, unsubscribed_from: ["SMS Alerts"]) }

      before { allow(airtable).to receive(:save) }

      it "syncs over unsubscriptions to account" do
        expect(airtable.fields['Unsubscribe - SMS Alerts']).to eq(nil)
        airtable.push(specialist)
        expect(airtable.fields['Unsubscribe - SMS Alerts']).to eq("Yes")
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
        airtable.fields['Biography']
      }.from(nil).to(specialist.bio)
    end

    it "syncs the email" do
      expect { airtable.push(specialist) }.to change {
        airtable.fields['Email Address']
      }.from(nil).to(specialist.account.email)
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
      context "when it is true" do
        let(:specialist) { create(:specialist, primarily_freelance: true) }

        it "sets 'Freelancing Status' column to primarily freelance" do
          expect { airtable.push(specialist) }.to change {
            airtable.fields['Freelancing Status']
          }.from(nil).to("Yes, freelancing is my primary occupation")
        end
      end

      context "when it is false" do
        let(:specialist) { create(:specialist, primarily_freelance: false) }

        it "sets 'Freelancing Status' column to part-time freelance" do
          expect { airtable.push(specialist) }.to change {
            airtable.fields['Freelancing Status']
          }.from(nil).to("No, I freelance alongside a full-time job")
        end
      end
    end

    context "when the public_use column has been set" do
      context "when it is true" do
        let(:specialist) { create(:specialist, public_use: true) }

        it "syncs 'Okay To Use Publicly' as Yes" do
          expect { airtable.push(specialist) }.to change {
            airtable.fields['Okay To Use Publicly']
          }.from(nil).to("Yes")
        end
      end

      context "when it is false" do
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
        specialist.account.update(password: "testing123")
        expect { airtable.push(specialist) }.to change {
          airtable.fields['Account Created']
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

  describe "account handling" do
    let(:specialist) { create(:specialist) }
    let(:airtable) { described_class.new({"Email Address" => email}, id: specialist.airtable_id) }

    context "when email is present" do
      let(:email) { "test@airtable.com" }

      it "creates the specialist" do
        specialist = airtable.sync
        expect(specialist.account).not_to be_nil
      end
    end

    context "when email is blank" do
      let(:email) { "" }

      it "does not create a specialist" do
        specialist = airtable.sync
        expect(specialist).to be_nil
      end
    end
  end
end
