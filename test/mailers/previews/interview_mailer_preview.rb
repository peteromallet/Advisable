class InterviewMailerPreview < ActionMailer::Preview
  def scheduled
    interview = interview_factory
    InterviewMailer.scheduled(interview)
  end

  def reminder
    interview = interview_factory
    scope = [:client, :specialist].sample
    InterviewMailer.reminder(interview, scope)
  end

  def feedback
    interview = interview_factory
    scope = [:client, :specialist].sample
    InterviewMailer.feedback(interview, scope)
  end

  private

  def interview_factory
    sales_person = FactoryBot.create(:sales_person)
    user = FactoryBot.create(:user, sales_person: sales_person)
    FactoryBot.create(:interview, user: user)
  end
end
