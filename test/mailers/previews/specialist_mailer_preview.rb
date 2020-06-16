class SpecialistMailerPreview < ActionMailer::Preview
  def confirm
    SpecialistMailer.confirm(
      uid: FactoryBot.create(:specialist).uid,
      token: Faker::Internet.password
    )
  end

  def verify_project
    project = FactoryBot.create(:previous_project)
    SpecialistMailer.verify_project(project.uid)
  end
end
