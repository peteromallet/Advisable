require 'rails_helper'

describe InterviewMailer do
  describe '#scheduled' do
    let(:interview) { FactoryBot.create(:interview) }
    let(:mail) {
      InterviewMailer.scheduled(interview, interview.user, interview.specialist)
    }

    it do
      expect(mail.to).to eq([interview.user.email])
      expect(mail.subject).to include(InterviewMailer::SCHEDULED_SUBJECT)
      expect(mail.body.encoded).to include(interview.user.first_name)
      expect(mail.body.encoded).to include(interview.specialist.first_name)
      expect(mail.body.encoded).to include(interview.zoom_meeting_id)
      expect(mail.body.encoded).to include(interview.starts_at.to_s(:long))
    end
  end

  describe '#reminder' do
    let(:starts_at) { 1.hour.from_now }
    let(:interview) { FactoryBot.create(:interview, starts_at: starts_at) }
    let(:mail) {
      InterviewMailer.reminder(interview, interview.specialist, interview.user)
    }

    context 'interview start date passed' do
      let(:starts_at) { DateTime.current - InterviewMailer::REMINDER_BEFORE }

      it do
        expect(mail.to).to be_nil
        expect(mail.subject).to be_nil
      end
    end

    it do
      expect(mail.to).to eq([interview.specialist.email])
      expect(mail.subject).to include(InterviewMailer::REMINDER_SUBJECT)
      expect(mail.body.encoded).to include(interview.user.first_name)
      expect(mail.body.encoded).to include(interview.specialist.first_name)
      expect(mail.body.encoded).to include(interview.zoom_meeting_id)
    end
  end
end
