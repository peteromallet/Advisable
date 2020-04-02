class SpecialistMailerPreview < ActionMailer::Preview
  def verify_project
    project = PreviousProject.last
    SpecialistMailer.verify_project(project.uid)
  end
end
