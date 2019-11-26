class Airtable::Consultation < Airtable::Base
  self.table_name = "Consultations"

  # Tells which active record model to sync data with.
  sync_with ::Consultation
  sync_column 'Reason For Consultation', to: :topic
  sync_column 'Consultation Status', to: :status
  sync_column 'Skills', to: :skills
  sync_association 'Specialist', to: :specialist
  sync_association 'Client Contact', to: :client_contact

  push_data do |consultation|
    self['Specialist'] = [consultation.specialist.try(:airtable_id)].compact
    self['Client Contact'] = [consultation.user.try(:airtable_id)].compact
    self['Reason For Consultation'] = consultation.topic
    self['Skills'] = consultation.skills
    self['Consultation Status'] = consultation.status
  end
end
