class Airtable::PreviousProject < Airtable::Base
  self.table_name = 'Off-Platform Projects'

  sync_with ::PreviousProject
  sync_column 'Client Contact First Name', to: :contact_first_name
  sync_column 'Client Contact Last Name', to: :contact_last_name
  sync_column 'Client Contact Job Title', to: :contact_job_title
  sync_column 'Client Name', to: :client_name
  sync_column 'Client Description', to: :client_description
  sync_column 'Specialist Requirement Description', to: :requirements
  sync_column 'Project Description', to: :description
  sync_column 'Results Description', to: :results
  sync_column 'Advisable Validation Status', to: :validation_status
  sync_column 'Validation Method', to: :validation_method
  sync_column 'Validated By Client', to: :validated_by_client
  sync_column 'Validation Explanation', to: :validation_explanation
  sync_column 'Contact Relationship', to: :contact_relationship
  sync_column 'Company Type', to: :company_type
  sync_column 'Priority', to: :priority
  sync_column 'Advisable Score', to: :advisable_score
  sync_association 'Application', to: :application

  sync_data do |opp|
    pull_specialist(opp)
    opp.confidential = fields['Okay with naming client'] != 'Yes'

    opp.hide_from_profile = fields['Hide From Profile'] == 'Yes'

    opp.public_use = true if self['Public Use'] == 'Yes'
    opp.public_use = false if self['Public Use'] == 'No'
    sync_skills(opp)
    sync_industries(opp)
  end

  push_data do |project|
    self['Primary Skill'] = [project.primary_skill.try(:airtable_id)].compact
    self['Primary Industry'] = [
      project.primary_industry.try(:airtable_id)
    ].compact
    self['Industries'] = project.industries.map(&:airtable_id).compact
    self['Client Contact First Name'] = project.contact_first_name
    self['Client Contact Last Name'] = project.contact_last_name
    self['Client Contact Job Title'] = project.contact_job_title
    self['Client Name'] = project.client_name
    self['Client Description'] = project.client_description
    self['Project Description'] = project.description
    self['Results Description'] = project.results
    self['Specialist Requirement Description'] = project.requirements
    self['Client Contact Email Address'] = project.contact_email
    self['Validation Method'] = project.validation_method
    self['Validation URL'] = project.validation_url
    self['Okay with naming client'] = project.confidential ? 'No' : 'Yes'
    self['Okay To Contact'] = project.can_contact ? 'Yes' : 'No'
    self['Specialist'] = [project.specialist.try(:airtable_id)]
    self['Skills Required'] = project.skills.map(&:airtable_id)
    self['Advisable Validation Status'] = project.validation_status
    self['Validated By Client'] = project.validated_by_client ? 'Yes' : 'No'
    self['Validation Explanation'] = project.validation_explanation
    self['Company Type'] = project.company_type
    self['Contact Relationship'] = project.contact_relationship
    self['Application'] = [project.application.try(:airtable_id)].compact

    unless project.public_use.nil?
      self['Public Use'] = 'Yes' if project.public_use == true
      self['Public Use'] = 'No' if project.public_use == false
    end
  end

  private

  # Setup the specialist relationship for the off_platform_project
  def pull_specialist(off_platform_project)
    airtable_id = fields['Specialist'].try(:first)
    return unless airtable_id
    specialist = ::Specialist.find_by_airtable_id(airtable_id)
    specialist = Airtable::Specialist.find(airtable_id).sync if specialist.nil?
    off_platform_project.specialist = specialist
  end

  # Syncs the projects skills from airtable
  def sync_skills(opp)
    skills_required = fields['Skills Required'] || []

    skills_required.each do |skill_id|
      skill = ::Skill.find_by_airtable_id(skill_id)
      skill = Airtable::Skill.find(skill_id).sync unless skill.present?
      next if skill.nil?
      project_skill = opp.project_skills.find_by_skill_id(skill.id)
      is_primary = skill.airtable_id == fields['Primary Skill'].try(:first)

      if project_skill.present?
        project_skill.update(primary: is_primary)
      else
        opp.project_skills.new(skill: skill, primary: is_primary)
      end
    end
  end

  # Syncs the projects industry from airtable
  def sync_industries(opp)
    industries = fields['Industries'] || []

    industries.each do |industry_id|
      industry = ::Industry.find_by_airtable_id(industry_id)
      unless industry.present?
        industry = Airtable::Industry.find(industry_id).sync
      end
      next if industry.nil?
      project_industry = opp.project_industries.find_by_industry_id(industry.id)
      is_primary =
        industry.airtable_id == fields['Primary Industry'].try(:first)

      if project_industry.present?
        project_industry.update(primary: is_primary)
      else
        opp.project_industries.new(industry: industry, primary: is_primary)
      end
    end
  end
end
