# frozen_string_literal: true

require "rails_helper"

RSpec.describe PreviousProjectHelper do
  let(:project) { create(:previous_project) }

  describe "#previous_project_company_name" do
    it "returns the client name" do
      output = helper.previous_project_company_name(project)
      expect(output).to eq(project.client_name)
    end

    context "when the project is confidential" do
      before do
        project.confidential = true
        project.company_type = "Startup"
        project.primary_industry = build(:industry, name: "Testing")
      end

      it "returns industry and company type" do
        output = helper.previous_project_company_name(project)
        expect(output).to eq("Testing Startup")
      end

      it "returns just the company type when no primary_industry is set" do
        project.primary_industry = nil
        output = helper.previous_project_company_name(project)
        expect(output).to eq("Startup")
      end

      it "returns '[industry] company' when no company_type is set" do
        project.company_type = nil
        output = helper.previous_project_company_name(project)
        expect(output).to eq("Testing company")
      end
    end
  end
end
