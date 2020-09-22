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
end
