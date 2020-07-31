class Airtable::Skill < Airtable::Base
  self.table_name = 'Skills'

  def self.active
    all(view: 'Selectable Skills', sort: { 'Name' => 'asc' }).reject do |s|
      s.fields['Name'].blank?
    end
  end

  def self.find_by_name(name)
    all(filter: "{Name} = '#{name}'").first
  end

  # Tells which active record model to sync data with.
  sync_with ::Skill
  sync_column 'Name', to: :name

  sync_data do |skill|
    skill.category = self['Category'].try(:first)
    skill.profile = self['Profile Skill'] == 'Yes'
    skill.active = self['Active'].try(:include?, 'Yes')
    skill.goal_placeholder = self['Goal Placeholder']
    skill.characteristic_placeholder = self['Characteristic Placeholder']
  end

  push_data { |skill| self['Name'] = skill.name }
end
