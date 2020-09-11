class Airtable::Interview < Airtable::Base
  self.table_name = 'Application Interviews'

  sync_with ::Interview
  sync_column 'Interview Time', to: :starts_at
  sync_column 'Call Status', to: :status
  sync_column 'Availability Note', to: :availability_note
  sync_column 'Zoom Meeting ID', to: :zoom_meeting_id
  sync_association 'Application', to: :application

  sync_data do |interview|
    interview.user = interview.application.try(:project).try(:user)
  end

  push_data do |interview|
    self['Interview Time'] = interview.starts_at
    self['Call Status'] = interview.status
    self['Application'] = [interview.application.try(:airtable_id)].compact
    self['Creation Time'] = DateTime.now.utc
    self['Availability Note'] = interview.availability_note

    if interview.status_changed? && interview.status == 'Call Requested'
      self['Email Post Meeting'] = 'Yes'
    end
  end
end
