require "rails_helper"

describe Airtable::OffPlatformProject do
  include_examples "sync airtable association", "Specialist", to: :specialist

  context 'when Okay with naming client is Yes' do
    it 'sets confidential to false' do
      record = create(:off_platform_project, confidential: true)
      airtable = Airtable::OffPlatformProject.new({
        "Okay with naming client" => "Yes"
      }, id: record.airtable_id)
      expect { airtable.sync }.to change {
        record.reload.confidential
      }.from(true).to(false)
    end
  end

  context 'when Okay with naming client is blank' do
    it 'sets confidential to true' do
      record = create(:off_platform_project, confidential: false)
      airtable = Airtable::OffPlatformProject.new({
        "Okay with naming client" => nil
      }, id: record.airtable_id)
      expect { airtable.sync }.to change {
        record.reload.confidential
      }.from(false).to(true)
    end
  end

  describe "#push_data" do
    let(:project) {
      create(:off_platform_project, {
        industry: "Testing",
        contact_first_name: "John",
        contact_job_title: "CEO",
        client_name: "Test Inc.",
        client_description: "Client Description",
        description: "Description",
        results: "Results",
        requirements: "Requirements",
        contact_email: "test@test.com",
        validation_method: "URL",
        validation_url: "https://test.com",
        validation_status: "pending"
      })
    }

    let(:airtable) { Airtable::OffPlatformProject.new({}, id: project.airtable_id) }

    it "syncs the 'Client Industry'" do
      expect { airtable.push(project) }.to change {
        airtable.fields['Client Industry']
      }.from(nil).to("Testing")
    end

    it "syncs the 'Client Contact First Name'" do
      expect { airtable.push(project) }.to change {
        airtable.fields['Client Contact First Name']
      }.from(nil).to("John")
    end

    it "syncs the 'Client Contact Job Title'" do
      expect { airtable.push(project) }.to change {
        airtable.fields['Client Contact Job Title']
      }.from(nil).to("CEO")
    end

    it "syncs the 'Cliet Name'" do
      expect { airtable.push(project) }.to change {
        airtable.fields['Client Name']
      }.from(nil).to("Test Inc.")
    end

    it "syncs the 'Cliet Description'" do
      expect { airtable.push(project) }.to change {
        airtable.fields['Client Description']
      }.from(nil).to(project.client_description)
    end

    it "syncs the 'Project Description'" do
      expect { airtable.push(project) }.to change {
        airtable.fields['Project Description']
      }.from(nil).to(project.description)
    end

    it "syncs the 'Results Description'" do
      expect { airtable.push(project) }.to change {
        airtable.fields['Results Description']
      }.from(nil).to(project.results)
    end

    it "syncs the 'Specialist Requirement Description'" do
      expect { airtable.push(project) }.to change {
        airtable.fields['Specialist Requirement Description']
      }.from(nil).to(project.requirements)
    end

    it "syncs the 'Validation Method'" do
      expect { airtable.push(project) }.to change {
        airtable.fields['Validation Method']
      }.from(nil).to(project.validation_method)
    end

    it "syncs the 'Validation URL'" do
      expect { airtable.push(project) }.to change {
        airtable.fields['Validation URL']
      }.from(nil).to(project.validation_url)
    end

    context "when confidential is true" do
      it "sets 'Okay with naming client' to blank" do
        project.confidential = true
        airtable.fields['Okay with naming client'] = 'Yes'
        expect { airtable.push(project) }.to change {
          airtable.fields['Okay with naming client']
        }.from('Yes').to(nil)
      end 
    end

    context "when confidential is false" do
      it "sets 'Okay with naming client' to true" do
        project.confidential = false
        airtable.fields['Okay with naming client'] = nil
        expect { airtable.push(project) }.to change {
          airtable.fields['Okay with naming client']
        }.from(nil).to("Yes")
      end 
    end

    context "when can_contact is true" do
      it "sets 'Okay To Contact' to Yes" do
        project.can_contact = true
        airtable.fields['Okay To Contact'] = nil
        expect { airtable.push(project) }.to change {
          airtable.fields['Okay To Contact']
        }.from(nil).to("Yes")
      end
    end

    context "when can_contact is false" do
      it "sets 'Okay To Contact' to blank" do
        project.can_contact = false
        airtable.fields['Okay To Contact'] = "Yes"
        expect { airtable.push(project) }.to change {
          airtable.fields['Okay To Contact']
        }.from("Yes").to(nil)
      end
    end

    it "syncs 'Specialist' column" do
      expect { airtable.push(project) }.to change {
        airtable.fields['Specialist']
      }.from(nil).to([project.specialist.airtable_id])
    end

    it "syncs 'Skills Required' column" do
      skill_a = create(:skill)
      skill_b = create(:skill)
      create(:project_skill, project: project, skill: skill_a)
      create(:project_skill, project: project, skill: skill_b)
      expect(airtable.fields['Skills Required']).to eq(nil)
      airtable.push(project)
      expect(airtable.fields['Skills Required']).to include(skill_a.airtable_id)
      expect(airtable.fields['Skills Required']).to include(skill_b.airtable_id)
    end

    it "syncs the 'Advisable Validation Status'" do
      expect { airtable.push(project) }.to change {
        airtable.fields['Advisable Validation Status']
      }.from(nil).to(project.validation_status)
    end

    context "when validated_by_client is true" do
      it "sets 'Validated By Client' to Yes" do
        project.validated_by_client = true
        airtable.fields['Validated By Client'] = nil
        expect { airtable.push(project) }.to change {
          airtable.fields['Validated By Client']
        }.from(nil).to("Yes")
      end 
    end

    context "when validated_by_client is false" do
      it "sets 'Validated By Client' to No" do
        project.validated_by_client = false
        airtable.fields['Validated By Client'] = 'Yes'
        expect { airtable.push(project) }.to change {
          airtable.fields['Validated By Client']
        }.from('Yes').to("No")
      end 
    end
  end
end