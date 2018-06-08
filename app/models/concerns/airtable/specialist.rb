class Airtable::Specialist < Airtable::Base
  self.table_name = "Specialists"

  has_many :specialist_skills, class: 'SpecialistSkill', column: "Specialist Skills"
  belongs_to :country, class: "Airtable::Country", column: "Country"

  # Tells which active record model to sync data with.
  sync_with ::Specialist
  sync_columns :first_name, :last_name, :city
  sync_column :linkedin_url, to: :linkedin
  sync_column :can_travel, to: :travel_availability

  sync_data do |specialist|
    # to prevent making more requests than we need, first check if there is
    # an existing country record
    country_airtable_id = fields["Country"].try(:first)
    if country_airtable_id
      country = ::Country.find_by_airtable_id(country_airtable_id)
      country = Airtable::Country.find(country_airtable_id).sync if country.nil?
      specialist.country = country
    end

    specialist.image = self[:image].try(:first)

    # iterate through each associated specialist id from airtable
    specialist_skills.each do |specialist_skill_id|
      # fetch the specialist skill airtable record
      specialist_skill = Airtable::SpecialistSkill.find(specialist_skill_id)
      # get the associated skill record
      skill_id = specialist_skill[:skill][0]
      # check if we already have a synced record of that skill.
      skill = ::Skill.find_by_airtable_id(skill_id)
      # if not then sync it
      skill = Airtable::Skill.find(skill_id).sync if skill.nil?
      # find or initialize an association.
      specialist.specialist_skills.find_or_initialize_by(skill: skill)
    end
  end

  private

  def specialist_skills
    fields["Specialist Skills"] || []
  end
end
