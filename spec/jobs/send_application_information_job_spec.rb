# frozen_string_literal: true

require "rails_helper"

RSpec.describe SendApplicationInformationJob do
  let!(:project) { create(:project) }
  let!(:with_skill) { create(:specialist, skills: [project.primary_skill]) }
  let!(:without_skill) { create(:specialist, skills: []) }
  let!(:with_skill_in_country) { create(:specialist, skills: [project.primary_skill], country: project.user.country) }
  let!(:without_skill_in_country) { create(:specialist, country: project.user.country) }
  let!(:not_available) { create(:specialist, skills: [project.primary_skill], unavailable_until: 2.weeks.from_now) }
  let!(:deleted_specialist) { create(:specialist, skills: [project.primary_skill], account: create(:account, deleted_at: 2.days.ago)) }

  before { allow_any_instance_of(Project).to receive(:sync_from_airtable) }

  it "invites specialists who have appropriate skills" do
    described_class.perform_now(project)

    [with_skill, with_skill_in_country].each do |specialist|
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "inform_about_project", "deliver_now", {args: [project.id, specialist.id]})
    end

    [without_skill, without_skill_in_country, deleted_specialist, not_available].each do |specialist|
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("SpecialistMailer", "inform_about_project", "deliver_now", {args: [project.id, specialist.id]})
    end
  end

  context "when location is important" do
    let!(:project) { create(:project, location_importance: 2) }

    it "invites specialists who have appropriate skill in same country" do
      described_class.perform_now(project)

      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "inform_about_project", "deliver_now", {args: [project.id, with_skill_in_country.id]})

      [with_skill, without_skill, without_skill_in_country, deleted_specialist].each do |specialist|
        expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("SpecialistMailer", "inform_about_project", "deliver_now", {args: [project.id, specialist.id]})
      end
    end
  end

  context "when application already exists" do
    it "invites only specialists without existing applications" do
      create(:application, specialist: with_skill, project: project)

      described_class.perform_now(project)

      [with_skill_in_country].each do |specialist|
        expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "inform_about_project", "deliver_now", {args: [project.id, specialist.id]})
      end

      [with_skill, without_skill, without_skill_in_country, deleted_specialist].each do |specialist|
        expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("SpecialistMailer", "inform_about_project", "deliver_now", {args: [project.id, specialist.id]})
      end
    end
  end
end
