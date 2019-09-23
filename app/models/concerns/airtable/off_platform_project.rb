class Airtable::OffPlatformProject < Airtable::Base
  self.table_name = "Off-Platform Projects"

  sync_with ::OffPlatformProject
  sync_column 'Client Industry', to: :industry
  sync_column 'Client Contact First Name', to: :contact_first_name
  sync_column 'Client Contact Last Name', to: :contact_last_name
  sync_column 'Client Contact Job Title', to: :contact_job_title
  sync_column 'Client Name', to: :client_name
  sync_column 'Client Description', to: :client_description
  sync_column 'Specialist Requirement Description', to: :requirements
  sync_column 'Project Description', to: :description
  sync_column 'Results Description', to: :results
  sync_column 'Primary Skill Required', to: :primary_skill
  sync_column 'Advisable Validation Status', to: :validation_status
  sync_column 'Validation Method', to: :validation_method
  sync_column 'Validated By Client', to: :validated_by_client
  sync_column 'Validation Explanation', to: :validation_explanation
  sync_column 'Company Type', to: :company_type

  sync_data do |off_platform_project|
    pull_specialist(off_platform_project)
    off_platform_project.confidential = fields['Okay with naming client'] != 'Yes'

    off_platform_project.public_use = true if self["Public Use"] == "Yes"
    off_platform_project.public_use = false if self["Public Use"] == "No"

    skills = off_platform_project.skills.map(&:airtable_id)
    skills_required = fields['Skills Required'] || []
    skills_required.each do |skill_id|
      unless skills.include?(skill_id)
        skill = ::Skill.find_by_airtable_id(skill_id)
        skill = Airtable::Skill.find(skill_id).sync unless skill.present?
        off_platform_project.project_skills.new(skill: skill)
      end
    end
  end

  push_data do |project|
    self["Client Industry"] = project.industry
    self["Client Contact First Name"] = project.contact_first_name
    self["Client Contact Last Name"] = project.contact_last_name
    self["Client Contact Job Title"] = project.contact_job_title
    self["Client Name"] = project.client_name
    self["Client Description"] = project.client_description
    self["Project Description"] = project.description
    self["Results Description"] = project.results
    self["Primary Skill Required"] = project.primary_skill
    self["Specialist Requirement Description"] = project.requirements
    self["Client Contact Email Address"] = project.contact_email
    self["Validation Method"] = project.validation_method
    self["Validation URL"] = project.validation_url
    self["Okay with naming client"] = project.confidential ? "No" : "Yes"
    self["Okay To Contact"] = project.can_contact ? "Yes" : "No"
    self["Specialist"] = [project.specialist.try(:airtable_id)]
    self["Skills Required"] = project.skills.map(&:airtable_id)
    self["Advisable Validation Status"] = project.validation_status
    self["Validated By Client"] = project.validated_by_client ? "Yes" : 'No'
    self["Validation Explanation"] = project.validation_explanation
    self["Company Type"] = project.company_type
    
    unless project.public_use.nil?
      self["Public Use"] = "Yes" if project.public_use == true
      self["Public Use"] = "No" if project.public_use == false
    end
  end

  private
  
  # Setup the specialist relationship for the off_platform_project
  def pull_specialist(off_platform_project)
    airtable_id = fields["Specialist"].try(:first)
    return unless airtable_id
    specialist = ::Specialist.find_by_airtable_id(airtable_id)
    specialist = Airtable::Specialist.find(airtable_id).sync if specialist.nil?
    off_platform_project.specialist = specialist
  end
end
