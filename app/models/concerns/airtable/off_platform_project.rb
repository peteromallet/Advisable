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

  sync_data do |off_platform_project|
    pull_specialist(off_platform_project)
    off_platform_project.confidential = fields['Okay with naming client'] != 'Yes'
    off_platform_project.validated = fields['Validated By Client'] == 'Yes'
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
