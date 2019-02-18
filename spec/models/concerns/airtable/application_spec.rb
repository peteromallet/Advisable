require 'rails_helper'

describe Airtable::Application do
  include_examples 'airtable syncing'

  describe '#status_to_sync' do
    context 'when the status is Interview Scheduled' do
      it 'returns Application Accepted' do
        application = Airtable::Application.new({
          "Application Status" => "Interview Scheduled"
        })

        expect(application.status_to_sync).to eq('Application Accepted')
      end
    end

    context 'when the status is Interview Completed' do
      it 'returns Application Accepted' do
        application = Airtable::Application.new({
          "Application Status" => "Interview Completed"
        })

        expect(application.status_to_sync).to eq('Application Accepted')
      end
    end

    it 'returns the application status' do
        application = Airtable::Application.new({
          "Application Status" => "Invited To Apply"
        })

        expect(application.status_to_sync).to eq('Invited To Apply')
    end
  end

  describe '#sync_data' do
    it 'sets the application status' do
      application = create(:application, status: nil)
      airtable = Airtable::Application.new({
        "Application Status" => "Invited To Apply"
      }, id: application.airtable_id)

      expect { airtable.sync }.to change { application.reload.status }
        .from(nil).to('Invited To Apply')
    end

    it 'sets accepts_fee to true if airtable value is Yes' do
      application = create(:application, accepts_fee: false)
      airtable = Airtable::Application.new({
        "Accepts Fee" => "Yes"
      }, id: application.airtable_id)

      expect { airtable.sync }.to change { application.reload.accepts_fee }
        .from(false).to(true)
    end

    it 'sets accepts_fee to false if airtable value is not Yes' do
      application = create(:application, accepts_fee: true)
      airtable = Airtable::Application.new({
        "Accepts Fee" => "No"
      }, id: application.airtable_id)

      expect { airtable.sync }.to change { application.reload.accepts_fee }
        .from(true).to(false)
    end

    it 'sets accepts_terms to true if airtable value is Yes' do
      application = create(:application, accepts_terms: false)
      airtable = Airtable::Application.new({
        "Accepts Terms" => "Yes"
      }, id: application.airtable_id)

      expect { airtable.sync }.to change { application.reload.accepts_terms }
        .from(false).to(true)
    end

    it 'sets accepts_terms to false if airtable value is not Yes' do
      application = create(:application, accepts_terms: true)
      airtable = Airtable::Application.new({
        "Accepts Terms" => "No"
      }, id: application.airtable_id)

      expect { airtable.sync }.to change { application.reload.accepts_terms }
        .from(true).to(false)
    end

    it 'sets featured to true if airtable value is Yes' do
      application = create(:application, featured: false)
      airtable = Airtable::Application.new({
        "Featured Candidate" => "Yes"
      }, id: application.airtable_id)

      expect { airtable.sync }.to change { application.reload.featured }
        .from(false).to(true)
    end

    it 'sets featured to false if airtable value is No' do
      application = create(:application, featured: true)
      airtable = Airtable::Application.new({
        "Featured Candidate" => "No"
      }, id: application.airtable_id)

      expect { airtable.sync }.to change { application.reload.featured }
        .from(true).to(false)
    end

    it 'sets references_requested to true if airtable value is Yes' do
      application = create(:application, references_requested: false)
      airtable = Airtable::Application.new({
        "References Requested" => "Yes"
      }, id: application.airtable_id)

      expect { airtable.sync }.to change { application.reload.references_requested }
        .from(false).to(true)
    end

    it 'sets references_requested to false if airtable value is No' do
      application = create(:application, references_requested: true)
      airtable = Airtable::Application.new({
        "References Requested" => "No"
      }, id: application.airtable_id)

      expect { airtable.sync }.to change { application.reload.references_requested }
        .from(true).to(false)
    end

    context "when the specialist record has been synced" do
      it 'sets up the association' do
        specialist_a = create(:specialist)
        specialist_b = create(:specialist)
        application = create(:application, specialist: specialist_a)
        airtable = Airtable::Application.new({
          "Expert" => [specialist_b.airtable_id]
        }, id: application.airtable_id)

        expect { airtable.sync }.to change { application.reload.specialist }
          .from(specialist_a).to(specialist_b)
      end
    end

    context "when the specialist record has not been synced" do
      it 'syncs the record' do
        application = create(:application)
        airtable = Airtable::Application.new({
          "Expert" => ['testing_1234']
        }, id: application.airtable_id)

        record = double(Airtable::Specialist)
        expect(record).to receive(:sync)
        expect(Airtable::Specialist).to receive(:find).with('testing_1234').and_return(record)
        airtable.sync
      end
    end
  end
end