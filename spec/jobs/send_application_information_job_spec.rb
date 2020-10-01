require "rails_helper"

RSpec.describe SendApplicationInformationJob do
  let!(:project) { create(:project) }
  let!(:specialist1) { create(:specialist, automated_invitations_subscription: false, skills: [project.primary_skill]) }
  let!(:specialist2) { create(:specialist, skills: [project.primary_skill]) }
  let!(:specialist3) { create(:specialist, skills: []) }
  let!(:specialist4) { create(:specialist, skills: [project.primary_skill], country: project.user.country) }
  let!(:specialist5) { create(:specialist, country: project.user.country) }

  it "invites specialists who have appropriate skills" do
    SendApplicationInformationJob.perform_now(project)
    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "inform_about_project", "deliver_now", {args: [project.id, specialist2.id]})
    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "inform_about_project", "deliver_now", {args: [project.id, specialist4.id]})
  end

  context "location is important" do
    let!(:project) { create(:project, location_importance: 2) }

    it "invites specialists who have appropriate skill in same country" do
      SendApplicationInformationJob.perform_now(project)
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "inform_about_project", "deliver_now", {args: [project.id, specialist4.id]})
    end
  end

  context "application already exists" do
    let!(:application) { create(:application, specialist: specialist2, project: project) }

    it "invites only specialists without existing applications" do
      SendApplicationInformationJob.perform_now(project)
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("SpecialistMailer", "inform_about_project", "deliver_now", {args: [project.id, specialist2.id]})
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "inform_about_project", "deliver_now", {args: [project.id, specialist4.id]})
    end
  end
end
