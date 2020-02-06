Airtable::Skill.sync_from_airtable
Airtable::Industry.sync_from_airtable
Airatble::ClientContact.sync_from_airtable
Airtable::Specialist.sync_from_airtable
Airtable::Project.sync_from_airtable
Airtable::Application.sync_from_airtable
Airtable::Task.sync_from_airtable

User.first.update(password: 'testing123', confirmed_at: 2.hours.ago)
Specialist.first.update(password: 'testing123', confirmed_at: 2.hours.ago)
