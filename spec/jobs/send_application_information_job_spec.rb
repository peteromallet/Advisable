require "rails_helper"

RSpec.describe SendApplicationInformationJob do
  let!(:project) { create(:project) }
  let!(:specialist1) { create(:specialist, automated_invitations_subscription: false, skills: [project.primary_skill]) }
  let!(:specialist2) { create(:specialist, skills: [project.primary_skill]) }
  let!(:specialist3) { create(:specialist, skills: []) }

  it "invites specialists who have appropriate skills" do
    SendApplicationInformationJob.perform_now(project)
    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "inform_about_project", "deliver_now", {args: [project.id, [specialist2.id]]})
  end

  context "location is important" do
    let!(:project) { create(:project, location_importance: 2) }
    let!(:specialist4) { create(:specialist, skills: [project.primary_skill], country: project.user.country) }
    let!(:specialist5) { create(:specialist, country: project.user.country) }

    it "invites specialists who have appropriate skill in same country" do
      SendApplicationInformationJob.perform_now(project)
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "inform_about_project", "deliver_now", {args: [project.id, [specialist4.id]]})
    end
  end
end
