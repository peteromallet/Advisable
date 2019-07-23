class Airtable::Specialist < Airtable::Base
  self.table_name = "Specialists"

  has_many :specialist_skills, class: 'SpecialistSkill', column: "Specialist Skills"
  belongs_to :country, class: "Airtable::Country", column: "Country"

  # Tells which active record model to sync data with.
  sync_with ::Specialist
  sync_column 'Email Address', to: :email
  sync_column 'First Name', to: :first_name
  sync_column 'Last Name', to: :last_name
  sync_column 'Phone Number', to: :phone_number
  sync_column 'Can Travel', to: :travel_availability
  sync_column 'City', to: :city
  sync_column 'LinkedIn URL', to: :linkedin
  sync_column 'Biography', to: :bio
  sync_column 'Application Stage', to: :application_stage
  sync_column 'Bank Holder Name', to: :bank_holder_name
  sync_column 'Bank Currency', to: :bank_currency
  sync_column 'VAT Number', to: :vat_number

  sync_data do |specialist|
    # sync the bank holder address
    if self['Bank Holder Address']
      specialist.bank_holder_address = Address.parse(self['Bank Holder Address']).to_h
    end

    # to prevent making more requests than we need, first check if there is
    # an existing country record
    country_airtable_id = fields["Country"].try(:first)
    if country_airtable_id
      country = ::Country.find_by_airtable_id(country_airtable_id)
      country = Airtable::Country.find(country_airtable_id).sync if country.nil?
      specialist.country = country
    end

    specialist.image = self['Image'].try(:first)

    # iterate through each associated specialist id from airtable
    specialist_skills.each do |skill_id|
      # check if we already have a synced record of that skill.
      skill = ::Skill.find_by_airtable_id(skill_id)
      # if not then sync it
      skill = Airtable::Skill.find(skill_id).sync if skill.nil?
      # find or initialize an association.
      specialist.specialist_skills.find_or_initialize_by(skill: skill)
    end

    specialist.remote = true if fields['Remote OK'].try(:include?, "Yes")
    specialist.remote = false if fields['Remote OK'].try(:include?, "No")
  end

  # After the syncing process has been complete
  after_sync do |specialist|
    # Deteremine wether or not the specialist record was just created for the
    # first time.
    new_record = specialist.created_at == specialist.updated_at

    # if the record is not a new record and there was an update to the
    # application_stage column then trigger a webhook event.
    if !new_record && specialist.saved_change_to_application_stage
      WebhookEvent.trigger(
        "specialists.application_stage_changed",
        WebhookEvent::Specialist.data(specialist)
      )
    end
  end

  # Describes how data should be synced to airtable.
  push_data do |specialist|
    self['Biography'] = specialist.bio
    self['Email Address'] = specialist.email
    self['Specialist Skills'] = specialist.skills.map(&:airtable_id).uniq
    self['City'] = specialist.city
    self['Account Created'] = specialist.has_account? ? "Yes" : nil
    self['Country'] = [specialist.country.try(:airtable_id)]
    self["Phone Number"] = specialist.phone_number
    self['Bank Holder Name'] = specialist.bank_holder_name
    self['Bank Currency'] = specialist.bank_currency
    self['VAT Number'] = specialist.vat_number
    
    if specialist.bank_holder_address
      self['Bank Holder Address'] = Address.new(specialist.bank_holder_address).to_s
    end

    if specialist.remote
      self['Remote OK'] = "Yes, I'm happy to work remote"
    else
      self['Remote OK'] = "No, I only work with clients in person"
    end
  end

  private

  def specialist_skills
    fields["Specialist Skills"] || []
  end
end
