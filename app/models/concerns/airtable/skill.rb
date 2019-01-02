class Airtable::Skill < Airtable::Base
  self.table_name = "Skills"

  # Tells which active record model to sync data with.
  sync_with ::Skill
  sync_column 'Name', to: :name

  sync_data do |skill|
    skill.category = fields['Category'].try(:first)
    skill.profile = fields['Profile Skill'] == 'Yes'
  end
end
