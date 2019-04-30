require 'rails_helper'

describe Project do
  include_examples "Airtable::Syncable"
  it { should validate_presence_of(:name) }
  it { should have_many(:applications) }

  describe "#deposit" do
    context "when there is no deposit" do
      it "returns 0" do
        project = build(:project, deposit: nil)
        expect(project.deposit).to eq(0)
      end
    end

    context "when there is a deposit" do
      it "returns the deposit" do
        project = build(:project, deposit: 500)
        expect(project.deposit).to eq(500)
      end
    end
  end

  describe "#deposit_paid" do
    context "when there is no deposit_paid" do
      it "returns 0" do
        project = build(:project, deposit_paid: nil)
        expect(project.deposit_paid).to eq(0)
      end
    end

    context "when there is a deposit_paid" do
      it "returns the deposit_paid" do
        project = build(:project, deposit_paid: 500)
        expect(project.deposit_paid).to eq(500)
      end
    end
  end

  describe "#deposit_owed" do
    context "when they have not paid any of the deposit" do
      it "returns the total amount" do
        project = build(:project, deposit: 1_000, deposit_paid: 0)
        expect(project.deposit_owed).to eq(1_000)
      end
    end

    context "when the deposit has been paid" do
      it "returns 0" do
        project = build(:project, deposit: 1_000, deposit_paid: 1_000)
        expect(project.deposit_owed).to eq(0)
      end
    end

    context "when some of the deposit has been paid" do
      it "returns the remainder" do
        project = build(:project, deposit: 1_000, deposit_paid: 500)
        expect(project.deposit_owed).to eq(500)
      end
    end
  end

  describe "#application_count" do
    it "excludes application with a status of Working" do
      project = create(:project)
      create(:application, project: project)
      create(:application, project: project, status: "Working")
      expect(project.application_count).to eq(1)
    end

    it "excludes application with a status of Invited To Apply" do
      project = create(:project)
      create(:application, project: project)
      create(:application, project: project, status: "Invited To Apply")
      expect(project.application_count).to eq(1)
    end


    it "excludes application with a status of Invitation Rejected" do
      project = create(:project)
      create(:application, project: project)
      create(:application, project: project, status: "Invitation Rejected")
      expect(project.application_count).to eq(1)
    end
  end
end
