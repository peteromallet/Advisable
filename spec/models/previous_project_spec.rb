require "rails_helper"

describe PreviousProject do
  it "has a title" do
    project = build(:project, primary_skill: "Marketing")
    application = build(:application)
    previous_project = PreviousProject.new(
      project: project,
      application: application
    )
    expect(previous_project.title).to eq(project.primary_skill)
  end

  it "has a description" do
    project = build(:project, description: "Testing")
    application = build(:application)
    previous_project = PreviousProject.new(
      project: project,
      application: application
    )
    expect(previous_project.description).to eq(project.description)
  end

  describe "#client_name" do
    context "when the project is a Project" do
      it "returns the users company_name" do
        project = build(:project, description: "Testing")
        application = build(:application)
        previous_project = PreviousProject.new(
          project: project,
          application: application
        )
        expect(previous_project.client_name).to eq(project.user.company_name)
      end
    end

    context "when the project is an OffPlatformProject" do
      context "and confidential is true" do
        it "hides the company name" do
          project = build(:off_platform_project, industry: "Testing", confidential: true)
          application = build(:application)
          previous_project = PreviousProject.new(project: project, application: application)
          expect(previous_project.client_name).to eq("Testing Company")
        end
      end

      context "and confidential is false" do
        it "returns the company name" do
          project = build(:off_platform_project, client_name: "Testing", confidential: false)
          application = build(:application)
          previous_project = PreviousProject.new(project: project, application: application)
          expect(previous_project.client_name).to eq("Testing")
        end
      end
    end
  end

  describe "#client_description" do
    context "when the project is a Project" do
      it "returns the company_description" do
        project = build(:project, company_description: "Testing")
        application = build(:application)
        previous_project = PreviousProject.new(
          project: project,
          application: application
        )
        expect(previous_project.client_description).to eq("Testing")
      end
    end

    context "when the project is an OffPlatformProject" do
      it "returns the client description" do
        project = build(:off_platform_project, client_description: "Testing")
        application = build(:application)
        previous_project = PreviousProject.new(project: project, application: application)
        expect(previous_project.client_description).to eq("Testing")
      end
    end
  end

  describe "#requirements" do
    context "when the project is a Project" do
      it "returns the projects specialist_description" do
        project = build(:project, specialist_description: "Testing")
        application = build(:application)
        previous_project = PreviousProject.new(
          project: project,
          application: application
        )
        expect(previous_project.requirements).to eq("Testing")
      end
    end

    context "when the project is an OffPlatformProject" do
      it "returns the requirements" do
        project = build(:off_platform_project, requirements: "Testing")
        application = build(:application)
        previous_project = PreviousProject.new(project: project, application: application)
        expect(previous_project.requirements).to eq("Testing")
      end
    end
  end
end