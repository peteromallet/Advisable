# frozen_string_literal: true

module Airtable
  class Specialist < Airtable::Base
    include Airtable::UnsubscribedFrom
    self.table_name = "Specialists"
    belongs_to :country, class: "Airtable::Country", column: "Country"
    sync_with ::Specialist

    push_data do |specialist|
      self["Biography"] = specialist.bio
      self["LinkedIn URL"] = specialist.linkedin
      self["Can Travel"] = specialist.travel_availability.presence
      self["Community Status"] = specialist.community_status
      self["Community Status - Applied To Join - Timestamp"] = specialist.community_applied_at
      self["Community Status - Accepted - Timestamp"] = specialist.community_accepted_at
      self["Community Status - Invited To Call - Timestamp"] = specialist.community_invited_to_call_at
      self["Community Score"] = specialist.community_score
      self["Email Address"] = specialist.account.email
      self["First Name"] = specialist.account.first_name
      self["Last Name"] = specialist.account.last_name
      self["Specialist Skills"] = specialist.skills.map(&:airtable_id).uniq
      self["City"] = specialist.city
      self["Account Created"] = specialist.account.has_password? ? "Yes" : nil
      self["Country"] = [specialist.country.try(:airtable_id)].compact
      self["Bank Holder Name"] = specialist.bank_holder_name
      self["Bank Currency"] = specialist.bank_currency
      self["VAT Number"] = specialist.vat_number
      self["Estimated Number of Freelance Projects"] = specialist.number_of_projects
      self["Application Stage"] = specialist.application_stage
      self["Interviewer"] = [specialist.interviewer&.airtable_id].compact
      self["Application Status"] = specialist.application_status
      self["Campaign Medium"] = specialist.campaign_medium
      self["Case Study Status"] = specialist.case_study_status
      self["Trustpilot Review Status"] = specialist.trustpilot_review_status
      self["Specialist Industries"] = specialist.industries.filter_map(&:airtable_id)

      if specialist.saved_change_to_bio
        self["Specialist Bio Updated"] = "Yes"
        self["Advisable Score"] = nil
      end

      if specialist.bank_holder_address
        self["Bank Holder Address"] =
          Address.new(specialist.bank_holder_address).to_s
      end

      self["Remote OK"] = if specialist.remote
                            "Yes, I'm happy to work remote"
                          else
                            "No, I only work with clients in person"
                          end

      self["Freelancing Status"] = "Yes, freelancing is my primary occupation" if specialist.primarily_freelance == true

      self["Freelancing Status"] = "No, I freelance alongside a full-time job" if specialist.primarily_freelance == false

      self["Freelancing Status"] = nil if specialist.primarily_freelance.nil?

      unless specialist.public_use.nil?
        self["Okay To Use Publicly"] = specialist.public_use ? "Yes" : "No"
      end

      self["PID"] = specialist.pid if specialist.pid
      self["Campaign Name"] = specialist.campaign_name if specialist.campaign_name
      self["Campaign Source"] = specialist.campaign_source if specialist.campaign_source
      self["Referrer"] = [specialist.referrer.airtable_id] if specialist.referrer

      # We only want to try and sync their avatar if they have uplodated one.
      # We also check to see if the filename in airtable is different to the
      # filename for our version as if they are the same then its probably the
      # same image and there is no need to reset it.
      if specialist.account.avatar.attached?
        airtable_image_filename = self["Image"].try(:first).try(:[], "filename")
        if airtable_image_filename != specialist.account.avatar.filename.to_s
          self["Image"] = [
            {
              url: specialist.account.avatar.url,
              filename: specialist.account.avatar.filename.to_s
            }
          ]
        end
      end

      # We do the same thing for the resume that we do for the image
      if specialist.resume.attached?
        airtable_filename = self["Resume"].try(:first).try(:[], "filename")
        if airtable_filename != specialist.resume.filename.to_s
          self["Resume"] = [
            {
              url: specialist.resume.url,
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
      if err.message.include?("ROW_DOES_NOT_EXIST")
        id = err.message[/(rec\w*)/, 1]
        skill = ::Skill.find_by_airtable_id(id)
        return handle_duplicate_skill(skill, record) if skill.present?
      end

      false
    end

    # When the airtable API responds with RECORD_DOES_NOT_EXIST it is likely
    # due to a duplicate skill that has been removed from airtable. This method
    # will handle duplicate skills before retrying to sync the record
    def handle_duplicate_skill(skill, record)
      original = ::Skill.where.not(id: skill.id).find_by(name: skill.name)

      if original
        record.specialist_skills.find_by(skill:).update(skill: original)
        original.merge_with!(duplicate: skill)
      else
        # The skill may have existed in airtable before so we need to clear out any existing airtable_id.
        skill.airtable_id = nil
        skill.sync_to_airtable # add the skill to airtable
      end

      record.reload
      true
    end

    private

    def specialist_skills
      fields["Specialist Skills"] || []
    end
  end
end
