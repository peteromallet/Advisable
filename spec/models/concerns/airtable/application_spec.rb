require 'rails_helper'

describe Airtable::Application do
  include_examples 'airtable syncing'
  include_examples 'sync airtable association', 'Client Project', to: :project

  describe '#status_to_sync' do
    context 'when the status is Interview Scheduled' do
      it 'returns Application Accepted' do
        application =
          Airtable::Application.new(
            { 'Application Status' => 'Interview Scheduled' }
          )

        expect(application.status_to_sync).to eq('Application Accepted')
      end
    end

    context 'when the status is Interview Completed' do
      it 'returns Application Accepted' do
        application =
          Airtable::Application.new(
            { 'Application Status' => 'Interview Completed' }
          )

        expect(application.status_to_sync).to eq('Application Accepted')
      end
    end

    it 'returns the application status' do
      application =
        Airtable::Application.new(
          { 'Application Status' => 'Invited To Apply' }
        )

      expect(application.status_to_sync).to eq('Invited To Apply')
    end
  end

  describe '#sync_data' do
    it 'sets the application status' do
      application = create(:application, status: nil)
      airtable =
        Airtable::Application.new(
          { 'Application Status' => 'Invited To Apply' },
          id: application.airtable_id
        )

      expect { airtable.sync }.to change { application.reload.status }.from(nil)
        .to('Invited To Apply')
    end

    it 'sets accepts_fee to true if airtable value is Yes' do
      application = create(:application, accepts_fee: false)
      airtable =
        Airtable::Application.new(
          { 'Accepts Fee' => 'Yes' },
          id: application.airtable_id
        )

      expect { airtable.sync }.to change {
        application.reload.accepts_fee
      }.from(false).to(true)
    end

    it 'sets accepts_fee to false if airtable value is not Yes' do
      application = create(:application, accepts_fee: true)
      airtable =
        Airtable::Application.new(
          { 'Accepts Fee' => 'No' },
          id: application.airtable_id
        )

      expect { airtable.sync }.to change {
        application.reload.accepts_fee
      }.from(true).to(false)
    end

    it 'sets accepts_terms to true if airtable value is Yes' do
      application = create(:application, accepts_terms: false)
      airtable =
        Airtable::Application.new(
          { 'Accepts Terms' => 'Yes' },
          id: application.airtable_id
        )

      expect { airtable.sync }.to change {
        application.reload.accepts_terms
      }.from(false).to(true)
    end

    it 'sets accepts_terms to false if airtable value is not Yes' do
      application = create(:application, accepts_terms: true)
      airtable =
        Airtable::Application.new(
          { 'Accepts Terms' => 'No' },
          id: application.airtable_id
        )

      expect { airtable.sync }.to change {
        application.reload.accepts_terms
      }.from(true).to(false)
    end

    it 'sets featured to true if airtable value is Yes' do
      application = create(:application, featured: false)
      airtable =
        Airtable::Application.new(
          { 'Featured Candidate' => 'Yes' },
          id: application.airtable_id
        )

      expect { airtable.sync }.to change { application.reload.featured }.from(
        false
      ).to(true)
    end

    it 'sets featured to false if airtable value is No' do
      application = create(:application, featured: true)
      airtable =
        Airtable::Application.new(
          { 'Featured Candidate' => 'No' },
          id: application.airtable_id
        )

      expect { airtable.sync }.to change { application.reload.featured }.from(
        true
      ).to(false)
    end

    it 'sets references_requested to true if airtable value is Yes' do
      application = create(:application, references_requested: false)
      airtable =
        Airtable::Application.new(
          { 'References Requested' => 'Yes' },
          id: application.airtable_id
        )

      expect { airtable.sync }.to change {
        application.reload.references_requested
      }.from(false).to(true)
    end

    it 'sets references_requested to false if airtable value is No' do
      application = create(:application, references_requested: true)
      airtable =
        Airtable::Application.new(
          { 'References Requested' => 'No' },
          id: application.airtable_id
        )

      expect { airtable.sync }.to change {
        application.reload.references_requested
      }.from(true).to(false)
    end

    context 'when the specialist record has been synced' do
      it 'sets up the association' do
        specialist_a = create(:specialist)
        specialist_b = create(:specialist)
        application = create(:application, specialist: specialist_a)
        airtable =
          Airtable::Application.new(
            { 'Expert' => [specialist_b.airtable_id] },
            id: application.airtable_id
          )

        expect { airtable.sync }.to change {
          application.reload.specialist
        }.from(specialist_a).to(specialist_b)
      end
    end

    context 'when the specialist record has not been synced' do
      it 'syncs the record' do
        application = create(:application)
        airtable =
          Airtable::Application.new(
            { 'Expert' => %w[testing_1234] },
            id: application.airtable_id
          )

        record = double(Airtable::Specialist)
        expect(record).to receive(:sync)
        expect(Airtable::Specialist).to receive(:find).with('testing_1234')
          .and_return(record)
        airtable.sync
      end
    end

    context "when there is an 'Answer 1'" do
      it 'syncs it as a question' do
        application = create(:application, questions: [])
        airtable =
          Airtable::Application.new(
            { 'Answer 1' => 'Answer', 'Question 1' => 'Question' },
            id: application.airtable_id
          )
        expect { airtable.sync }.to change {
          application.reload.questions
        }.from([]).to([{ 'question' => 'Question', 'answer' => 'Answer' }])
      end
    end

    context "when there is an 'Answer 2'" do
      it 'syncs it as a question' do
        application = create(:application, questions: [])
        airtable =
          Airtable::Application.new(
            { 'Answer 2' => 'Answer', 'Question 2' => 'Question' },
            id: application.airtable_id
          )
        expect { airtable.sync }.to change {
          application.reload.questions
        }.from([]).to([{ 'question' => 'Question', 'answer' => 'Answer' }])
      end
    end
  end

  describe '#push_data' do
    let(:application) { create(:application) }

    let(:airtable) do
      Airtable::Application.new({}, id: application.airtable_id)
    end

    before :each do
      allow(airtable).to receive(:save)
    end

    context 'when the status has been changed' do
      it "syncs the 'Application Status' column" do
        application.reload
        application.status = 'Invited To Apply'
        application.save
        expect { airtable.push(application) }.to change {
          airtable.fields['Application Status']
        }.from(nil).to('Invited To Apply')
      end
    end

    context 'when the introduction has been changed' do
      it "syncs the 'One Line Overview' column" do
        application.reload
        application.introduction = 'Intro'
        application.save
        expect { airtable.push(application) }.to change {
          airtable.fields['One Line Overview']
        }.from(nil).to('Intro')
      end
    end

    context 'when the introduction has not been changed' do
      it "doesn't sync the 'Application Status' column" do
        application.reload
        expect { airtable.push(application) }.not_to change {
          airtable.fields['One Line Overview']
        }
      end
    end

    context 'when the availability has been changed' do
      it "syncs the 'One Line Overview' column" do
        application.reload
        application.introduction = 'Intro'
        application.save
        expect { airtable.push(application) }.to change {
          airtable.fields['One Line Overview']
        }.from(nil).to('Intro')
      end
    end

    context 'when the introduction has not been changed' do
      it "doesn't sync the 'Application Status' column" do
        application.reload
        expect { airtable.push(application) }.not_to change {
          airtable.fields['One Line Overview']
        }
      end
    end

    context 'when saved changes to questions' do
      it 'syncs the Answer and Question fields' do
        application.reload
        application.questions = [
          { 'question' => 'Question 1', 'answer' => 'Answer 1' },
          { 'question' => 'Question 2', 'answer' => 'Answer 2' }
        ]
        application.save
        airtable.push(application)
        expect(airtable.fields['Question 1']).to eq('Question 1')
        expect(airtable.fields['Answer 1']).to eq('Answer 1')
        expect(airtable.fields['Question 2']).to eq('Question 2')
        expect(airtable.fields['Answer 2']).to eq('Answer 2')
      end
    end

    it "syncs the 'References - Off Platform Projects' column" do
      project = create(:previous_project)
      create(:application_reference, application: application, project: project)
      expect { airtable.push(application) }.to change {
        airtable.fields['References - Off Platform Projects']
      }.from(nil).to([project.airtable_id])
    end

    context 'when saved changes to rate' do
      it "syncs the 'Hourly Rate For Project'" do
        application.reload
        application.rate = 100
        application.save
        expect { airtable.push(application) }.to change {
          airtable.fields['Hourly Rate For Project']
        }.from(nil).to(100)
      end
    end

    context "when hasn't saved changes to rate" do
      it "does not sync the 'Hourly Rate For Project'" do
        application.reload
        expect { airtable.push(application) }.to_not change {
                        airtable.fields['Hourly Rate For Project']
                      }
      end
    end

    context 'if accepts_terms is true' do
      it "syncs 'Accepts Terms' as 'Yes'" do
        application.reload
        application.accepts_terms = true
        application.save
        expect { airtable.push(application) }.to change {
          airtable.fields['Accepts Terms']
        }.from(nil).to('Yes')
      end
    end

    context 'if accepts_terms is false' do
      it "syncs 'Accepts Terms' as 'No'" do
        application.reload
        application.accepts_terms = false
        application.save
        expect { airtable.push(application) }.to change {
          airtable.fields['Accepts Terms']
        }.from(nil).to('No')
      end
    end

    context 'if accepts_fee is true' do
      it "syncs 'Accepts Fee' as 'Yes'" do
        application.reload
        application.accepts_fee = true
        application.save
        expect { airtable.push(application) }.to change {
          airtable.fields['Accepts Fee']
        }.from(nil).to('Yes')
      end
    end

    context 'if accepts_fee is false' do
      it "syncs 'Accepts Fee' as 'No'" do
        application.reload
        application.accepts_fee = false
        application.save
        expect { airtable.push(application) }.to change {
          airtable.fields['Accepts Fee']
        }.from(nil).to('No')
      end
    end

    it "syncs the 'Applied At' column" do
      application.applied_at = DateTime.now
      application.save
      expect { airtable.push(application) }.to change {
        airtable.fields['Applied At']
      }.from(nil).to(application.applied_at)
    end
  end
end
