# frozen_string_literal: true

require "rails_helper"

RSpec.describe Application do
  it { is_expected.to belong_to(:project) }
  it { is_expected.to belong_to(:specialist) }

  describe "#questions" do
    context "when nil" do
      it "returns an empty array" do
        application = described_class.new
        application.questions = nil
        expect(application.questions).to eq([])
      end
    end
  end

  describe ".featured" do
    it "only includes featured applications" do
      a = create(:application, featured: true)
      b = create(:application, featured: false)
      expect(described_class.featured).to include(a)
      expect(described_class.featured).not_to include(b)
    end
  end

  describe ".rejected" do
    it "only includes rejected applications" do
      a = create(:application, status: "Application Rejected")
      b = create(:application, status: "Applied")
      expect(described_class.rejected).to include(a)
      expect(described_class.rejected).not_to include(b)
    end
  end

  describe ".not_hidden" do
    it "exlucdes any applications that have been hidden" do
      a = create(:application, hidden: nil)
      b = create(:application, hidden: true)
      expect(described_class.not_hidden).to include(a)
      expect(described_class.not_hidden).not_to include(b)
    end
  end

  describe ".not_final" do
    it "excludes applications with a status of Working" do
      a = create(:application, status: "Applied")
      b = create(:application, status: "Working")
      expect(described_class.not_final).to include(a)
      expect(described_class.not_final).not_to include(b)
    end

    it "excludes applications with a status of Application Rejected" do
      a = create(:application, status: "Applied")
      b = create(:application, status: "Application Rejected")
      expect(described_class.not_final).to include(a)
      expect(described_class.not_final).not_to include(b)
    end

    it "excludes applications with a status of Invited To Apply" do
      a = create(:application, status: "Applied")
      b = create(:application, status: "Invited To Apply")
      expect(described_class.not_final).to include(a)
      expect(described_class.not_final).not_to include(b)
    end

    it "excludes applications with a status of Invitation Rejected" do
      a = create(:application, status: "Applied")
      b = create(:application, status: "Invitation Rejected")
      expect(described_class.not_final).to include(a)
      expect(described_class.not_final).not_to include(b)
    end
  end

  describe ".top_three_applied" do
    it "only includes applications with a score above 65" do
      a = create(:application, status: "Applied", score: 66)
      b = create(:application, status: "Applied", score: 65)
      expect(described_class.top_three_applied).to include(a)
      expect(described_class.top_three_applied).not_to include(b)
    end

    it "only returns the top three results" do
      a = create(:application, status: "Applied", score: 100)
      b = create(:application, status: "Applied", score: 90)
      c = create(:application, status: "Applied", score: 80)
      d = create(:application, status: "Applied", score: 70)
      expect(described_class.top_three_applied).to include(a)
      expect(described_class.top_three_applied).to include(b)
      expect(described_class.top_three_applied).to include(c)
      expect(described_class.top_three_applied).not_to include(d)
    end

    it "orders the results by score" do
      a = create(:application, status: "Applied", score: 80)
      b = create(:application, status: "Applied", score: 100)
      c = create(:application, status: "Applied", score: 70)
      expect(described_class.top_three_applied[0]).to eq(b)
      expect(described_class.top_three_applied[1]).to eq(a)
      expect(described_class.top_three_applied[2]).to eq(c)
    end
  end

  context "when update_project_counts" do
    let!(:application) { create(:application, status: "Applied") }

    it "is called when the status is updated" do
      expect(application).to receive(:update_project_counts)
      application.update(status: "Application Accepted")
    end

    it "is called when the application is destroyed" do
      expect(application).to receive(:update_project_counts)
      application.destroy
    end

    it "is not called when the status isnt updated" do
      expect(application).not_to receive(:update_project_counts)
      application.update(introduction: "Changed")
    end
  end
end
