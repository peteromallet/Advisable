class SpecialistMailerPreview < ActionMailer::Preview
  def verify_project
    project = OffPlatformProject.last
    SpecialistMailer.verify_project(project.uid)
  end
end