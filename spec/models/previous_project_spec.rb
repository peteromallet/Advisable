require "rails_helper"

describe PreviousProject do
  describe ".find" do
    context "when type is OffPlatformProject" do
      it "returns a PreviousProject" do
        specialist = create(:specialist)
        project = create(:off_platform_project, specialist: specialist)

        previous_project = PreviousProject.find(
          id: project.airtable_id,
          type: "OffPlatformProject",
          specialist_id: specialist.airtable_id
        )

        expect(previous_project).to be_a(PreviousProject)
        expect(previous_project.project).to eq(project)
        expect(previous_project.specialist).to eq(specialist)
      end

      context "the project doesnt belong to the specialist" do
        it "raises an error" do
          specialist = create(:specialist)
          project = create(:off_platform_project)
          expect {
            previous_project = PreviousProject.find(
              id: project.airtable_id,
              type: "OffPlatformProject",
              specialist_id: specialist.airtable_id
            )
          }.to raise_error(ActiveRecord::RecordNotFound)
        end
      end
    end

    context "when the type is Project" do
      it "returns a PreviousProject" do
        specialist = create(:specialist)
        project = create(:project)
        application = create(:application, project: project, specialist: specialist)
        create(:booking, status: "Complete", application: application)

        previous_project = PreviousProject.find(
          id: project.airtable_id,
          type: "Project",
          specialist_id: specialist.airtable_id
        )

        expect(previous_project).to be_a(PreviousProject)
        expect(previous_project.project).to eq(project)
        expect(previous_project.specialist).to eq(specialist)
      end

      context "when the user has no compelte booking for the project" do
        it "raises NotFound" do
          specialist = create(:specialist)
          project = create(:project)
          application = create(:application, project: project, specialist: specialist)

          expect {
            previous_project = PreviousProject.find(
              id: project.airtable_id,
              type: "Project",
              specialist_id: specialist.airtable_id
            )
          }.to raise_error(ActiveRecord::RecordNotFound)
        end
      end
    end
  end

  describe ".for_specialist" do
    context "when the user has an off platform project" do
      it "includes that project" do
        specialist = create(:specialist)
        project = create(:off_platform_project, specialist: specialist)
        projects = PreviousProject.for_specialist(specialist)
        expect(projects).to_not be_empty
        expect(projects.first.project).to eq(project)
      end
    end

    context "when the user has a completed booking for a project" do
      it "includes that project" do
        specialist = create(:specialist)
        project = create(:project)
        application = create(:application, project: project, specialist: specialist)
        create(:booking, status: "Complete", application: application)
        projects = PreviousProject.for_specialist(specialist)
        expect(projects).to_not be_empty
        expect(projects.first.project).to eq(project)
      end
    end

    context "when the user has an accepted booking for a project" do
      it "includes that project" do
        specialist = create(:specialist)
        project = create(:project)
        application = create(:application, project: project, specialist: specialist)
        create(:booking, status: "Accepted", application: application)
        projects = PreviousProject.for_specialist(specialist)
        expect(projects).to_not be_empty
        expect(projects.first.project).to eq(project)
      end
    end

    context "when the user has no booking for a project" do
      it "does not include the project" do
        specialist = create(:specialist)
        project = create(:project)
        application = create(:application, project: project, specialist: specialist)
        projects = PreviousProject.for_specialist(specialist)
        expect(projects).to be_empty
      end
    end

    context "when the user has a proposed booking for a project" do
      it "does not include the project" do
        specialist = create(:specialist)
        project = create(:project)
        application = create(:application, project: project, specialist: specialist)
        create(:booking, status: "Proposed", application: application)
        projects = PreviousProject.for_specialist(specialist)
        expect(projects).to be_empty
      end
    end
  end
end