class Airtable::Interview < Airtable::Base
  self.table_name = "Application Interviews"

  sync_with ::Interview
  sync_column "Interview Time", to: :starts_at
  sync_column "Call Status", to: :status
  sync_association "Application", to: :application

  sync_data do |interview|
    interview.user = interview.application.project.user
  end
end
