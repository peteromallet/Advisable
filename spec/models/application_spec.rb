require 'rails_helper'

describe Application do
  it { should belong_to(:project) }
  it { should belong_to(:specialist) }

  describe '#questions' do
    context 'when nil' do
      it 'returns an empty array' do
        application = Application.new
        application.questions = nil
        expect(application.questions).to eq([])
      end
    end
  end

  describe '.featured' do
    it 'only includes featured applications' do
      a = create(:application, featured: true)
      b = create(:application, featured: false)
      expect(Application.featured).to include(a)
      expect(Application.featured).to_not include(b)
    end
  end

  describe '.rejected' do
    it 'only includes rejected applications' do
      a = create(:application, status: 'Application Rejected')
      b = create(:application, status: 'Applied')
      expect(Application.rejected).to include(a)
      expect(Application.rejected).to_not include(b)
    end
  end

  describe '.not_hidden' do
    it 'exlucdes any applications that have been hidden' do
      a = create(:application, hidden: nil)
      b = create(:application, hidden: true)
      expect(Application.not_hidden).to include(a)
      expect(Application.not_hidden).to_not include(b)
    end
  end

  describe '.not_final' do
    it 'excludes applications with a status of Working' do
      a = create(:application, status: 'Applied')
      b = create(:application, status: 'Working')
      expect(Application.not_final).to include(a)
      expect(Application.not_final).to_not include(b)
    end

    it 'excludes applications with a status of Application Rejected' do
      a = create(:application, status: 'Applied')
      b = create(:application, status: 'Application Rejected')
      expect(Application.not_final).to include(a)
      expect(Application.not_final).to_not include(b)
    end

    it 'excludes applications with a status of Invited To Apply' do
      a = create(:application, status: 'Applied')
      b = create(:application, status: 'Invited To Apply')
      expect(Application.not_final).to include(a)
      expect(Application.not_final).to_not include(b)
    end

    it 'excludes applications with a status of Invitation Rejected' do
      a = create(:application, status: 'Applied')
      b = create(:application, status: 'Invitation Rejected')
      expect(Application.not_final).to include(a)
      expect(Application.not_final).to_not include(b)
    end
  end

  describe '.top_three_applied' do
    it 'only includes applications with a score above 65' do
      a = create(:application, status: 'Applied', score: 66)
      b = create(:application, status: 'Applied', score: 65)
      expect(Application.top_three_applied).to include(a)
      expect(Application.top_three_applied).to_not include(b)
    end

    it 'only returns the top three results' do
      a = create(:application, status: 'Applied', score: 100)
      b = create(:application, status: 'Applied', score: 90)
      c = create(:application, status: 'Applied', score: 80)
      d = create(:application, status: 'Applied', score: 70)
      expect(Application.top_three_applied).to include(a)
      expect(Application.top_three_applied).to include(b)
      expect(Application.top_three_applied).to include(c)
      expect(Application.top_three_applied).to_not include(d)
    end

    it 'orders the results by score' do
      a = create(:application, status: 'Applied', score: 80)
      b = create(:application, status: 'Applied', score: 100)
      c = create(:application, status: 'Applied', score: 70)
      expect(Application.top_three_applied[0]).to eq(b)
      expect(Application.top_three_applied[1]).to eq(a)
      expect(Application.top_three_applied[2]).to eq(c)
    end
  end

  context 'update_project_counts' do
    it 'is called when the status is updated' do
      application = create(:application, status: 'Applied')
      expect(application).to receive(:update_project_counts)
      application.update status: 'Application Accepted'
    end

    it 'is called when the application is destroyed' do
      application = create(:application, status: 'Applied')
      expect(application).to receive(:update_project_counts)
      application.destroy
    end

    it 'is not called when the status isnt updated' do
      application = create(:application, status: 'Applied')
      expect(application).to_not receive(:update_project_counts)
      application.update introduction: 'Changed'
    end
  end
end
