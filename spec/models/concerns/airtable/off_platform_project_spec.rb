require 'rails_helper'

describe Airtable::OffPlatformProject do
  context 'when Okay with naming client is Yes' do
    it 'sets confidential to false' do
      record = create(:off_platform_project, confidential: true)
      airtable =
        Airtable::OffPlatformProject.new(
          { 'Okay with naming client' => 'Yes', 'Skills Required' => [] },
          id: record.airtable_id
        )
      expect { airtable.sync }.to change { record.reload.confidential }.from(
        true
      )
        .to(false)
    end
  end

  context 'when Okay with naming client is blank' do
    it 'sets confidential to true' do
      record = create(:off_platform_project, confidential: false)
      airtable =
        Airtable::OffPlatformProject.new(
          { 'Okay with naming client' => nil, 'Skills Required' => [] },
          id: record.airtable_id
        )
      expect { airtable.sync }.to change { record.reload.confidential }.from(
        false
      )
        .to(true)
    end
  end

  describe 'syncing skills' do
    it 'creates project_skill records for skills that dont already exist' do
      project = create(:off_platform_project)
      skill = create(:skill)
      record =
        Airtable::OffPlatformProject.new(
          { 'Skills Required' => [skill.airtable_id] },
          id: project.airtable_id
        )
      expect { record.sync }.to change { project.project_skills.count }.by(1)
    end

    it 'does not create a new project skill if one already exists for that skill' do
      project = create(:off_platform_project)
      skill = create(:skill)
      project.skills << skill
      record =
        Airtable::OffPlatformProject.new(
          { 'Skills Required' => [skill.airtable_id] },
          id: project.airtable_id
        )
      expect { record.sync }.to_not change { project.project_skills.count }
    end

    it 'creates a record with primary = true for the primary skill' do
      project = create(:off_platform_project, primary_skill: nil)
      skills = [create(:skill), create(:skill)]
      record =
        Airtable::OffPlatformProject.new(
          {
            'Skills Required' => skills.map(&:airtable_id),
            'Primary Skill' => [skills.last.airtable_id]
          },
          id: project.airtable_id
        )
      expect { record.sync }.to change { project.reload.primary_skill }.from(
        nil
      )
        .to(skills.last)
    end

    it 'updates the project_skill with primary = true for the primary skill' do
      project = create(:off_platform_project, primary_skill: nil)
      skills = [create(:skill), create(:skill)]
      project_skills = [
        create(
          :project_skill,
          project: project, skill: skills.first, primary: false
        ),
        create(
          :project_skill,
          project: project, skill: skills.last, primary: false
        )
      ]
      record =
        Airtable::OffPlatformProject.new(
          {
            'Skills Required' => skills.map(&:airtable_id),
            'Primary Skill' => [skills.last.airtable_id]
          },
          id: project.airtable_id
        )
      expect { record.sync }.to change {
        project_skills.last.reload.primary
      }.from(false)
        .to(true)
    end
  end

  describe 'syncing industries' do
    it 'creates project_industry records for industries that dont already exist' do
      project = create(:off_platform_project)
      industry = create(:industry)
      record =
        Airtable::OffPlatformProject.new(
          { 'Industries' => [industry.airtable_id] },
          id: project.airtable_id
        )
      expect { record.sync }.to change { project.project_industries.count }.by(
        1
      )
    end

    it 'does not create a new project industry if one already exists for that industry' do
      project = create(:off_platform_project)
      industry = create(:industry)
      project.industries << industry
      record =
        Airtable::OffPlatformProject.new(
          { 'Industries' => [industry.airtable_id] },
          id: project.airtable_id
        )
      expect { record.sync }.to_not change { project.project_industries.count }
    end

    it 'creates a record with primary = true for the primary industry' do
      project = create(:off_platform_project, primary_industry: nil)
      industries = [create(:industry), create(:industry)]
      record =
        Airtable::OffPlatformProject.new(
          {
            'Industries' => industries.map(&:airtable_id),
            'Primary Industry' => [industries.last.airtable_id]
          },
          id: project.airtable_id
        )
      expect { record.sync }.to change { project.reload.primary_industry }.from(
        nil
      )
        .to(industries.last)
    end

    it 'updates the project_industry with primary = true for the primary industry' do
      project = create(:off_platform_project, primary_industry: nil)
      industries = [create(:industry), create(:industry)]
      project_industries = [
        create(
          :project_industry,
          project: project, industry: industries.first, primary: false
        ),
        create(
          :project_industry,
          project: project, industry: industries.last, primary: false
        )
      ]
      record =
        Airtable::OffPlatformProject.new(
          {
            'Industries' => industries.map(&:airtable_id),
            'Primary Industry' => [industries.last.airtable_id]
          },
          id: project.airtable_id
        )
      expect { record.sync }.to change {
        project_industries.last.reload.primary
      }.from(false)
        .to(true)
    end
  end

  describe '#push_data' do
    let(:project) do
      create(
        :off_platform_project,
        {
          contact_first_name: 'John',
          contact_last_name: 'Doe',
          contact_job_title: 'CEO',
          client_name: 'Test Inc.',
          company_type: 'Startup',
          public_use: false,
          client_description: 'Client Description',
          description: 'Description',
          results: 'Results',
          confidential: true,
          requirements: 'Requirements',
          contact_email: 'test@test.com',
          validation_method: 'URL',
          validation_url: 'https://test.com',
          validation_status: 'pending',
          validated_by_client: false
        }
      )
    end

    let(:airtable) do
      Airtable::OffPlatformProject.new({}, id: project.airtable_id)
    end

    it 'syncs the data' do
      skill_a = create(:skill)
      create(:project_skill, project: project, skill: skill_a)
      expect(airtable).to receive(:[]=).with(
        'Primary Industry',
        [project.primary_industry.airtable_id]
      )
      expect(airtable).to receive(:[]=).with(
        'Primary Skill',
        [project.primary_skill.airtable_id]
      )
      expect(airtable).to receive(:[]=).with(
        'Industries',
        project.industries.map(&:airtable_id)
      )
      expect(airtable).to receive(:[]=).with(
        'Client Contact First Name',
        'John'
      )
      expect(airtable).to receive(:[]=).with('Client Contact Last Name', 'Doe')
      expect(airtable).to receive(:[]=).with('Client Contact Job Title', 'CEO')
      expect(airtable).to receive(:[]=).with('Client Name', 'Test Inc.')
      expect(airtable).to receive(:[]=).with('Company Type', 'Startup')
      expect(airtable).to receive(:[]=).with(
        'Contact Relationship',
        project.contact_relationship
      )
      expect(airtable).to receive(:[]=).with('Public Use', 'No')
      expect(airtable).to receive(:[]=).with(
        'Client Description',
        project.client_description
      )
      expect(airtable).to receive(:[]=).with(
        'Project Description',
        project.description
      )
      expect(airtable).to receive(:[]=).with(
        'Results Description',
        project.results
      )
      expect(airtable).to receive(:[]=).with(
        'Specialist Requirement Description',
        project.requirements
      )
      expect(airtable).to receive(:[]=).with(
        'Client Contact Email Address',
        project.contact_email
      )
      expect(airtable).to receive(:[]=).with(
        'Validation Method',
        project.validation_method
      )
      expect(airtable).to receive(:[]=).with(
        'Validation URL',
        project.validation_url
      )
      expect(airtable).to receive(:[]=).with('Okay with naming client', 'No')
      expect(airtable).to receive(:[]=).with('Okay To Contact', 'No')
      expect(airtable).to receive(:[]=).with(
        'Specialist',
        [project.specialist.airtable_id]
      )
      expect(airtable).to receive(:[]=).with(
        'Skills Required',
        project.skills.map(&:airtable_id)
      )
      expect(airtable).to receive(:[]=).with(
        'Advisable Validation Status',
        project.validation_status
      )
      expect(airtable).to receive(:[]=).with('Validated By Client', 'No')
      expect(airtable).to receive(:[]=).with(
        'Validation Explanation',
        project.validation_explanation
      )
      airtable.push(project)
    end
  end
end
