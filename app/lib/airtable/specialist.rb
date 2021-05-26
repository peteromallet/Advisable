# frozen_string_literal: true

module Airtable
  class Specialist < Airtable::Base
    include Airtable::UnsubscribedFrom

    self.table_name = 'Specialists'

    belongs_to :country, class: 'Airtable::Country', column: 'Country'

    # Tells which active record model to sync data with.
    sync_with ::Specialist

    sync_column_to_association 'Email Address', association: :account, to: :email
    sync_column_to_association 'First Name', association: :account, to: :first_name
    sync_column_to_association 'Last Name', association: :account, to: :last_name

    sync_column 'VAT Number', to: :vat_number
    sync_column 'Phone Number', to: :phone
    sync_column 'Can Travel', to: :travel_availability
    sync_column 'City', to: :city
    sync_column 'LinkedIn URL', to: :linkedin
    sync_column 'Biography', to: :bio
    sync_column 'Application Stage', to: :application_stage
    sync_column 'Bank Holder Name', to: :bank_holder_name
    sync_column 'Bank Currency', to: :bank_currency
    sync_column 'Estimated Number of Freelance Projects', to: :number_of_projects
    sync_column 'PID', to: :pid
    sync_column 'Campaign Name', to: :campaign_name
    sync_column 'Campaign Source', to: :campaign_source
    sync_column 'Community Status', to: :community_status
    sync_column 'Community Status - Applied To Join - Timestamp', to: :community_applied_at
    sync_column 'Community Status - Accepted - Timestamp', to: :community_accepted_at
    sync_column 'Community Status - Invited To Call - Timestamp', to: :community_invited_to_call_at
    sync_column 'Community Score', to: :community_score

    sync_data do |specialist|
      if self['Bank Holder Address']
        # sync the bank holder address
        specialist.bank_holder_address =
          Address.parse(self['Bank Holder Address']).to_h
      end

      # Sync 'Okay To Use Publicly'
      specialist.public_use = self['Okay To Use Publicly'].include?('Yes') if self['Okay To Use Publicly']

      # sync the Freelancing Status column
      freelancing_status = fields['Freelancing Status']
      specialist.primarily_freelance = freelancing_status.try(:include?, 'Yes')

      # sync the typical hourly rate. We store the horuly rate as a minor currency
      # e.g $46.54 is stored as the int 4654
      hourly_rate = fields['Typical Hourly Rate']
      specialist.hourly_rate = hourly_rate * 100 if hourly_rate

      # to prevent making more requests than we need, first check if there is
      # an existing country record
      country_airtable_id = fields['Country'].try(:first)

      if country_airtable_id
        country = ::Country.find_by_airtable_id(country_airtable_id)
        country = Airtable::Country.find(country_airtable_id).sync if country.nil?
        specialist.country = country
      end

      specialist.image = self['Image'].try(:first)

      # iterate through each associated specialist id from airtable
      specialist_skills.each do |skill_id|
        # check if we already have a synced record of that skill.
        skill =
          ::Skill.find_by_airtable_id(skill_id)
        # if not then sync it
        skill = Airtable::Skill.find(skill_id).sync if skill.nil?
        # find or initialize an association.
        specialist.specialist_skills.find_or_initialize_by(skill: skill)
      end

      specialist.remote = true if fields['Remote OK'].try(:include?, 'Yes')
      specialist.remote = false if fields['Remote OK'].try(:include?, 'No')
      specialist.account.test_account = true if fields['Test Account'].try(:include?, 'Yes')
      specialist.referrer_id = Specialist.find_by(airtable_id: self['Referrer'].first)&.id if self['Referrer'].try(:first).present?

      sync_unsubscribed_from(specialist)
    end

    # After the syncing process has been complete
    after_sync do |specialist|
      if specialist.account.blank?
        specialist.destroy
        break
      end

      specialist.saved_change_to_application_stage
      # Deteremine whether or not the specialist record was just created for the
      #  first time.
      new_record = specialist.created_at == specialist.updated_at

      # if the record is not a new record and there was an update to the
      # application_stage column then trigger a webhook event.
      if !new_record && specialist.saved_change_to_application_stage
        WebhookEvent.trigger(
          'specialists.application_stage_changed',
          WebhookEvent::Specialist.data(specialist)
        )
      end
    end

    # Describes how data should be synced to airtable.
    push_data do |specialist|
      self['Biography'] = specialist.bio
      self['LinkedIn URL'] = specialist.linkedin
      self['Can Travel'] = specialist.travel_availability.presence
      self['Community Status'] = specialist.community_status
      self['Community Status - Applied To Join - Timestamp'] = specialist.community_applied_at
      self['Community Status - Accepted - Timestamp'] = specialist.community_accepted_at
      self['Community Status - Invited To Call - Timestamp'] = specialist.community_invited_to_call_at
      self['Community Score'] = specialist.community_score
      self['Email Address'] = specialist.account.email
      self['First Name'] = specialist.account.first_name
      self['Last Name'] = specialist.account.last_name
      self['Specialist Skills'] = specialist.skills.map(&:airtable_id).uniq
      self['City'] = specialist.city
      self['Account Created'] = specialist.account.has_password? ? 'Yes' : nil
      self['Country'] = [specialist.country.try(:airtable_id)].compact
      self['Phone Number'] = specialist.phone
      self['Bank Holder Name'] = specialist.bank_holder_name
      self['Bank Currency'] = specialist.bank_currency
      self['VAT Number'] = specialist.vat_number
      self['Estimated Number of Freelance Projects'] =
        specialist.number_of_projects
      self['Application Stage'] = specialist.application_stage

      if specialist.saved_change_to_bio
        self['Specialist Bio Updated'] = 'Yes'
        self['Advisable Score'] = nil
      end

      self['Typical Hourly Rate'] = specialist.hourly_rate / 100.0 if specialist.hourly_rate

      if specialist.bank_holder_address
        self['Bank Holder Address'] =
          Address.new(specialist.bank_holder_address).to_s
      end

      self['Remote OK'] = if specialist.remote
                            "Yes, I'm happy to work remote"
                          else
                            'No, I only work with clients in person'
                          end

      self['Freelancing Status'] = 'Yes, freelancing is my primary occupation' if specialist.primarily_freelance == true

      self['Freelancing Status'] = 'No, I freelance alongside a full-time job' if specialist.primarily_freelance == false

      self['Freelancing Status'] = nil if specialist.primarily_freelance.nil?

      unless specialist.public_use.nil?
        self['Okay To Use Publicly'] = specialist.public_use ? 'Yes' : 'No'
      end

      self['PID'] = specialist.pid if specialist.pid
      self['Campaign Name'] = specialist.campaign_name if specialist.campaign_name
      self['Campaign Source'] = specialist.campaign_source if specialist.campaign_source
      self['Referrer'] = [specialist.referrer.airtable_id] if specialist.referrer

      # We only want to try and sync their avatar if they have uplodated one.
      # We also check to see if the filename in airtable is different to the
      # filename for our version as if they are the same then its probably the
      # same image and there is no need to reset it.
      if specialist.avatar.attached?
        airtable_image_filename = self['Image'].try(:first).try(:[], 'filename')
        if airtable_image_filename != specialist.avatar.filename.to_s
          self['Image'] = [
            {
              url: specialist.avatar.service_url,
              filename: specialist.avatar.filename.to_s
            }
          ]
        end
      end

      # We do the same thing for the resume that we do for the image
      if specialist.resume.attached?
        airtable_filename = self['Resume'].try(:first).try(:[], 'filename')
        if airtable_filename != specialist.resume.filename.to_s
          self['Resume'] = [
            {
              url: specialist.resume.service_url,
              filename: specialist.resume.filename.to_s
            }
          ]
        end
      end

      push_unsubscribed_from(specialist)
    end

    # handle_airtable_error is called when airtable responds with an error during
    # the push process. IF the error code returned is ROW_DOES_NOT_EXIST then
    # this could be due to a duplicate skill record so we pass on to the
    # handle_duplicate_skill method.
    def handle_airtable_error(err, record)
      # extract the id of the record that could not be found from the error

      # get the postgres skill that represents this skill

      # pass on to the handle_duplicate_skill method if the skill exists

      if err.message.include?('ROW_DOES_NOT_EXIST')
        id = err.message[/(rec\w*)/, 1]

        skill = ::Skill.find_by_airtable_id(id)

        return handle_duplicate_skill(skill, record) if skill.present?

        # otherwise reraise the error, its a different kind of missing record.
        # possibly a country association or something..
        return false
      end

      false
    end

    # When the airtable API responds with RECORD_DOES_NOT_EXIST it is likely
    # due to a duplicate skill that has been removed from airtable. This method
    # will handle duplicate skills before retrying to sync the record
    def handle_duplicate_skill(skill, record)
      original = ::Skill.where.not(id: skill.id).find_by(name: skill.name)

      if original
        record.specialist_skills.find_by(skill: skill).update(skill: original)
        original.merge_with!(duplicate: skill)
      else
        # The skill may have existed in airtable before so we need to clear
        # out any existing airtable_id.
        skill.airtable_id = nil
        skill.sync_to_airtable # add the skill to airtable
      end

      record.reload
      true
    end

    private

    def specialist_skills
      fields['Specialist Skills'] || []
    end
  end
end
