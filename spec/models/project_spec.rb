require 'rails_helper'

describe Project do
  include_examples 'Airtable::Syncable'
  it { should have_many(:applications) }

  describe '#deposit' do
    context 'when there is no deposit' do
      it 'returns 0' do
        project = build(:project, deposit: nil)
        expect(project.deposit).to eq(0)
      end
    end

    context 'when there is a deposit' do
      it 'returns the deposit' do
        project = build(:project, deposit: 500)
        expect(project.deposit).to eq(500)
      end
    end
  end

  describe '#accepted_terms=' do
    it 'sets accepted_terms_at to the current time' do
      project = create(:project, accepted_terms_at: nil)
      project.accepted_terms = true
      expect(project.accepted_terms_at).to be_within(1.second).of(DateTime.now)
    end

    context 'when accepted_terms_at is already set' do
      it 'does not change the accepted_terms_at' do
        project = create(:project, accepted_terms_at: 5.days.ago)
        project.accepted_terms = true
        expect(project.accepted_terms_at).to be_within(1.second).of(5.days.ago)
      end
    end
  end

  describe '#deposit_paid' do
    context 'when there is no deposit_paid' do
      it 'returns 0' do
        project = build(:project, deposit_paid: nil)
        expect(project.deposit_paid).to eq(0)
      end
    end

    context 'when there is a deposit_paid' do
      it 'returns the deposit_paid' do
        project = build(:project, deposit_paid: 500)
        expect(project.deposit_paid).to eq(500)
      end
    end
  end

  describe '#deposit_owed' do
    context 'when they have not paid any of the deposit' do
      it 'returns the total amount' do
        project = build(:project, deposit: 1_000, deposit_paid: 0)
        expect(project.deposit_owed).to eq(1_000)
      end
    end

    context 'when the deposit has been paid' do
      it 'returns 0' do
        project = build(:project, deposit: 1_000, deposit_paid: 1_000)
        expect(project.deposit_owed).to eq(0)
      end
    end

    context 'when some of the deposit has been paid' do
      it 'returns the remainder' do
        project = build(:project, deposit: 1_000, deposit_paid: 500)
        expect(project.deposit_owed).to eq(500)
      end
    end
  end

  describe '#applications_open' do
    context 'when sales_status is Won' do
      it 'returns false' do
        project = create(:project, sales_status: 'Won')
        expect(project.applications_open).to be_falsey
      end
    end

    context 'when sales_status is Lost' do
      it 'returns false' do
        project = create(:project, sales_status: 'Lost')
        expect(project.applications_open).to be_falsey
      end
    end

    context 'when sales_status is Open' do
      it 'returns true' do
        project = create(:project, sales_status: 'Open')
        expect(project.applications_open).to be_truthy
      end
    end

    context 'when sales_status is nil' do
      it 'returns true' do
        project = create(:project, sales_status: nil)
        expect(project.applications_open).to be_truthy
      end
    end
  end

  describe '#candidates' do
    it 'only shows the top 3 applied candidates' do
      project = create(:project)
      applicationA =
        create(:application, project: project, score: 70, status: 'Applied')
      applicationB =
        create(:application, project: project, score: 75, status: 'Applied')
      applicationC =
        create(:application, project: project, score: 80, status: 'Applied')
      applicationD =
        create(:application, project: project, score: 85, status: 'Applied')

      expect(project.candidates).not_to include(applicationA)
      expect(project.candidates).to include(applicationB)
      expect(project.candidates).to include(applicationC)
      expect(project.candidates).to include(applicationD)
    end

    it 'excludes any candidates with a score below 65' do
      project = create(:project)
      applicationA =
        create(:application, project: project, score: 60, status: 'Applied')
      applicationB =
        create(:application, project: project, score: 75, status: 'Applied')

      expect(project.candidates).not_to include(applicationA)
      expect(project.candidates).to include(applicationB)
    end

    it 'includes any candidates that have a status of "Application Accepted"' do
      project = create(:project)
      application =
        create(
          :application,
          project: project, score: 75, status: 'Application Accepted'
        )
      expect(project.candidates).to include(application)
    end

    it 'includes any candidates that have a status of "Application Rejected"' do
      project = create(:project)
      application =
        create(
          :application,
          project: project, score: 75, status: 'Application Rejected'
        )
      expect(project.candidates).to include(application)
    end

    it 'includes any candidates that have a status of "Interview Scheduled"' do
      project = create(:project)
      application =
        create(
          :application,
          project: project, score: 75, status: 'Interview Scheduled'
        )
      expect(project.candidates).to include(application)
    end

    it 'includes any candidates that have a status of "Interview Completed"' do
      project = create(:project)
      application =
        create(
          :application,
          project: project, score: 75, status: 'Interview Completed'
        )
      expect(project.candidates).to include(application)
    end

    it 'includes any candidates that have a status of "Proposed"' do
      project = create(:project)
      application =
        create(:application, project: project, score: 75, status: 'Proposed')
      expect(project.candidates).to include(application)
    end

    it 'excludes any candidates that have a status of "Working"' do
      project = create(:project)
      application =
        create(:application, project: project, score: 75, status: 'Working')
      expect(project.candidates).not_to include(application)
    end

    it 'excludes any candidates that have a status of "Stopped Working"' do
      project = create(:project)
      application =
        create(
          :application,
          project: project, score: 75, status: 'Stopped Working'
        )
      expect(project.candidates).not_to include(application)
    end

    it 'excludes any candidates that have a status of "Invited To Apply"' do
      project = create(:project)
      application =
        create(
          :application,
          project: project, score: 75, status: 'Invited To Apply'
        )
      expect(project.candidates).not_to include(application)
    end

    it 'excludes any candidates that have a status of "Invitation Rejected"' do
      project = create(:project)
      application =
        create(
          :application,
          project: project, score: 75, status: 'Invitation Rejected'
        )
      expect(project.candidates).not_to include(application)
    end

    it 'excludes any candidates that have a status of "To Be Invited"' do
      project = create(:project)
      application =
        create(
          :application,
          project: project, score: 75, status: 'To Be Invited'
        )
      expect(project.candidates).not_to include(application)
    end
  end
end
