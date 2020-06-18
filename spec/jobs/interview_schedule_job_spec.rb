require 'rails_helper'

Rails.describe InterviewScheduleJob do
  let(:interview) { FactoryBot.create(:interview, zoom_meeting_id: nil) }
  let(:vcr_cassette) { 'zoom_meeting' }

  before do
    ActionMailer::Base.deliveries.clear
    ActiveJob::Base.queue_adapter.performed_jobs.clear
    ActiveJob::Base.queue_adapter.enqueued_jobs.clear

    VCR.insert_cassette(vcr_cassette)
  end

  after { VCR.eject_cassette(vcr_cassette) }

  describe '#perform' do
    it do
      expect(interview.zoom_meeting_id).to be_nil

      InterviewScheduleJob.perform_now(interview)
      zoom_meeting_id = interview.reload.zoom_meeting_id

      expect(zoom_meeting_id).to_not be_nil

      InterviewScheduleJob.perform_now(interview)

      expect(zoom_meeting_id).to eq(interview.reload.zoom_meeting_id)
      expect(ActiveJob::Base.queue_adapter.enqueued_jobs.size).to eq(5)

      jobs = ActiveJob::Base.queue_adapter.enqueued_jobs
        .map { |j| j[:args].slice(0..1).join('#') }

      expect(jobs).to eq([
        'InterviewMailer#scheduled',
        'InterviewMailer#reminder',
        'InterviewMailer#reminder',
        'InterviewMailer#feedback',
        'InterviewMailer#feedback'
      ])
    end
  end
end
