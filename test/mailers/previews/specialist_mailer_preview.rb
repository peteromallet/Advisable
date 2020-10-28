class SpecialistMailerPreview < ActionMailer::Preview
  def verify_project
    project = PreviousProject.last
    SpecialistMailer.verify_project(project.uid)
  end

  def inform_about_project
    project = Project.order(Arel.sql('RANDOM()')).first
    specialist = Specialist.order(Arel.sql('RANDOM()')).first
    SpecialistMailer.inform_about_project(project.id, specialist.id)
  end

  def interview_reschedule_request
    SpecialistMailer.interview_reschedule_request(random_interview)
  end

  def project_paused
    application = Application.order(Arel.sql('RANDOM()')).first
    SpecialistMailer.project_paused(application.project, application)
  end

  private

  def random_interview
    Interview.order(Arel.sql('RANDOM()')).first
  end
end
