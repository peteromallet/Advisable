class Airtable::Consultation < Airtable::Base
  self.table_name = 'Consultations'

  # Tells which active record model to sync data with.
  sync_with ::Consultation
  sync_column 'Reason For Consultation', to: :topic
  sync_column 'Consultation Status', to: :status
  sync_column 'Consultation Source', to: :source
  sync_column 'Specialist Rejected Reason', to: :rejection_reason
  sync_column 'Likely To Hire', to: :likely_to_hire
  sync_association 'Specialist', to: :specialist
  sync_association 'Skill', to: :skill

  sync_data do |consultation|
    user_id = fields['Client Contact'].try(:first)

    if user_id
      user = ::User.find_by_airtable_id(user_id)
      user = Airtable::ClientContact.find(user_id).sync if user.nil?
      consultation.user = user
    end
  end

  push_data do |consultation|
    self['Specialist'] = [consultation.specialist.try(:airtable_id)].compact
    self['Client Contact'] = [consultation.user.try(:airtable_id)].compact
    self['Reason For Consultation'] = consultation.topic
    self['Skill'] = [consultation.skill.try(:airtable_id)].compact
    self['Consultation Status'] = consultation.status
    self['Consultation Source'] = consultation.source
    self['Likely To Hire'] = consultation.likely_to_hire
    self['Specialist Rejected Reason'] = consultation.rejection_reason

    self['Consultation Status - Request Started - Timestamp'] =
      consultation.request_started_at
    self['Consultation Status - Request Completed - Timestamp'] =
      consultation.request_completed_at
    self['Consultation Status - Sent To Specialist - Timestamp'] =
      consultation.sent_at
    self['Consultation Status - Accepted By Specialist - Timestamp'] =
      consultation.accepted_at
    self['Consultation Status - Specialist Rejected - Timestamp'] =
      consultation.rejected_at
    self['Consultation Status - Advisable Rejected - Timestamp'] =
      consultation.advisable_rejected_at
  end
end
