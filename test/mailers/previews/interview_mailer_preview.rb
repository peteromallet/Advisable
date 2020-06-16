class InterviewMailerPreview < ActionMailer::Preview
  def scheduled
    interview = FactoryBot.create(:interview)
    InterviewMailer.scheduled(interview, interview.user, interview.specialist)
  end

  def reminder
    interview = FactoryBot.create(:interview)
    InterviewMailer.reminder(interview, interview.specialist, interview.user)
  end
end
