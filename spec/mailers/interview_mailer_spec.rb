require 'rails_helper'

describe InterviewMailer do
  let(:sales_person) { FactoryBot.create(:sales_person) }
  let(:user) { FactoryBot.create(:user, sales_person: sales_person) }
  let(:interview) { FactoryBot.create(:interview, user: user) }

  describe '#scheduled' do
    let(:mail) {
      InterviewMailer.scheduled(interview)
    }

    it do
      expect(mail.from).to eq([sales_person.email])
      expect(mail.to).to eq([interview.specialist.email])
      expect(mail.subject).to include(
        InterviewMailer::SCHEDULED_SUBJECT.split('%').first
      )
      expect(mail.body.encoded).to include(interview.user.first_name)
      expect(mail.body.encoded).to include(interview.specialist.first_name)
    end
  end

  describe '#reminder' do
    let(:should_start_at) { }
    let(:scope) { :specialist }
    let(:mail) {
      InterviewMailer.reminder(interview, scope, should_start_at.to_i)
    }

    context 'interview start date passed' do
      let(:should_start_at) { interview.starts_at - 20.minutes }

      it do
        expect(mail.to).to be_nil
        expect(mail.subject).to be_nil
      end
    end

    context 'when sent to clients' do
      let(:scope) { :client }

      it do
        expect(mail.from).to eq([sales_person.email])
        expect(mail.to).to eq([interview.user.email])
        expect(mail.subject).to include(
          InterviewMailer::REMINDER_CLIENT_SUBJECT.split('%').first
        )
        expect(mail.body.encoded).to include(interview.user.first_name)
        expect(mail.body.encoded).to include(interview.specialist.first_name)
      end
    end

    it do
      expect(mail.to).to eq([interview.specialist.email])
      expect(mail.subject).to include(
        InterviewMailer::REMINDER_SPECIALIST_SUBJECT.split('%').first
      )
      expect(mail.body.encoded).to include(interview.user.first_name)
      expect(mail.body.encoded).to include(interview.specialist.first_name)
      expect(mail.body.encoded).to include(interview.zoom_meeting_id)
    end
  end

  describe '#feedback' do
    let(:scope) { :specialist }
    let(:should_start_at) { }
    let(:mail) {
      InterviewMailer.feedback(interview, scope, should_start_at.to_i)
    }

    context 'interview start date passed' do
      let(:should_start_at) { interview.starts_at - 20.minutes }

      it do
        expect(mail.to).to be_nil
        expect(mail.subject).to be_nil
      end
    end

    context 'when sent to clients' do
      let(:scope) { :client }

      it do
        expect(mail.to).to eq([interview.user.email])
        expect(mail.bcc).to eq([interview.user.sales_person.email])
        expect(mail.subject).to include(
          InterviewMailer::FEEDBACK_CLIENT_SUBJECT.split('%').first
        )
        expect(mail.body.encoded).to include(interview.airtable_id)
        expect(mail.body.encoded).to include(interview.application.airtable_id)
        expect(mail.body.encoded).to include(interview.specialist.name)
      end
    end

    it do
      expect(mail.to).to eq([interview.specialist.email])
      expect(mail.bcc).to eq([interview.user.sales_person.email])
      expect(mail.subject).to include(
        InterviewMailer::FEEDBACK_SPECIALIST_SUBJECT.split('%').first
      )
      expect(mail.body.encoded).to include(interview.airtable_id)
      expect(mail.body.encoded).to include(interview.application.airtable_id)
    end
  end
end
