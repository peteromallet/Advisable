require "rails_helper"

describe Airtable::Specialist do
  include_examples "sync airtable association", "Country", to: :country

  describe "syncing the application stage" do
    let(:specialist) { create(:specialist, application_stage: nil) }
    let(:airtable) { Airtable::Specialist.new({
      "Application Stage" => "Applied"
    }, id: specialist.airtable_id) }

    it 'saves the application stage' do
      expect { airtable.sync }.to change { specialist.reload.application_stage }
        .from(nil).to("Applied")
    end

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

    context "when the specialist has an account" do
      it "sets 'Account Created' to 'Yes'" do
        specialist.update(password: "testing123")
        expect { airtable.push(specialist) }.to change {
          airtable.fields['Account Created']
        }.from(nil).to("Yes")
      end
    end
  end
end