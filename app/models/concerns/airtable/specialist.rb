class Airtable::Specialist < Airtable::Base
  self.table_name = "Specialists"

  has_many :skills, class: 'Skill', column: "Expertise"
  belongs_to :country, class: "Airtable::Country", column: "Country"

  # Tells which active record model to sync data with.
  sync_with ::Specialist
  sync_columns :first_name, :last_name, :city
  sync_column :linkedin_url, to: :linkedin
  sync_column :can_travel, to: :travel_availability

  sync_data do |specialist|
    # to prevent making more requests than we need, first check if there is
    # an existing country record
    country_airtable_id = fields["Country"][0]
    if country_airtable_id
      country = ::Country.find_by_airtable_id(country_airtable_id)
      country = Airtable::Country.find(country_airtable_id).sync if country.nil?
      specialist.country = country
    end

    specialist.image = self[:image].try(:first)

    fields["Expertise"].each do |skill_airtable_id|
      skill = ::Skill.find_by_airtable_id(skill_airtable_id)
      skill = Airtable::Skill.find(skill_airtable_id).sync if skill.nil?
      specialist.specialist_skills.find_or_initialize_by(skill: skill)
    end
  end
end
