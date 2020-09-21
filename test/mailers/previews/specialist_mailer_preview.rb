class SpecialistMailerPreview < ActionMailer::Preview
  def verify_project
    project = PreviousProject.last
    SpecialistMailer.verify_project(project.uid)
  end

  def inform_about_project
    project = Project.order(Arel.sql('RANDOM()')).first
    specialists = Specialist.order(Arel.sql('RANDOM()')).first(5)
    SpecialistMailer.inform_about_project(project.id, specialists.pluck(:id))
  end
end
