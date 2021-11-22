# frozen_string_literal: true

# Updates a specialists profile
module Mutations
  class UpdateProfile < Mutations::BaseMutation
    attr_reader :specialist, :attributes

    description "Update a specialist's profile"

    argument :avatar, String, required: false
    argument :bio, String, required: false
    argument :city, String, required: false
    argument :country, ID, required: false
    argument :email, String, required: false
    argument :first_name, String, required: false
    argument :hourly_rate, Int, required: false
    argument :industries, [String], required: false
    argument :instagram, String, required: false
    argument :last_name, String, required: false
    argument :linkedin, String, required: false
    argument :medium, String, required: false
    argument :number_of_projects, String, required: false
    argument :primarily_freelance, Boolean, required: false
    argument :public_use, Boolean, required: false
    argument :remote, Boolean, required: false
    argument :resume, String, required: false
    argument :skills, [String], required: false
    argument :twitter, String, required: false
    argument :username, String, required: false
    argument :website, String, required: false

    argument :ideal_project, String, required: false
    argument :previous_work_description, String, required: false
    argument :previous_work_results, String, required: false

    field :specialist, Types::SpecialistType, null: true

    def authorized?(**_args)
      ApiError.not_authenticated("You are not logged in") unless current_user
      ApiError.not_authenticated("You are logged in as a user") if current_user.is_a?(::User)

      true
    end

    def resolve(**args)
      @specialist = current_user
      @attributes = args
      @subscribe_to_labels = @unsubscribe_from_labels = []

      specialist.assign_attributes(assignable_attributes)
      specialist.account.update(account_assignable_attributes)
      specialist.avatar.attach(attributes[:avatar]) if attributes[:avatar]
      specialist.resume.attach(attributes[:resume]) if attributes[:resume]

      update_skills if attributes[:skills]
      update_industries if attributes[:industries]
      update_country if attributes[:country]
      update_subscriptions

      success = current_account_responsible_for do
        specialist.save
      end

      ApiError.invalid_request("FAILED_TO_UPDATE", specialist.errors.full_messages.first) unless success

      specialist.bg_sync_to_airtable

      {specialist: specialist}
    end

    private

    def assignable_attributes
      attributes.slice(
        :username,
        :bio,
        :city,
        :remote,
        :medium,
        :website,
        :twitter,
        :linkedin,
        :instagram,
        :public_use,
        :hourly_rate,
        :number_of_projects,
        :primarily_freelance,
        :previous_work_description,
        :previous_work_results,
        :ideal_project
      )
    end

    def account_assignable_attributes
      attributes.slice(:email, :first_name, :last_name)
    end

    def update_skills
      existing_skills = specialist.skills.map(&:id)
      skills = Skill.where(name: attributes[:skills])
      specialist.skill_ids = skills.map(&:id)
      @subscribe_to_labels += Label.where(skill_id: specialist.skill_ids - existing_skills)
      @unsubscribe_from_labels += Label.where(skill_id: existing_skills - specialist.skill_ids)
    end

    def update_industries
      existing_industries = specialist.industries.map(&:id)
      industries = Industry.where(name: attributes[:industries])
      specialist.industry_ids = industries.map(&:id)
      @subscribe_to_labels += Label.where(industry_id: specialist.industry_ids - existing_industries)
      @unsubscribe_from_labels += Label.where(industry_id: existing_industries - specialist.industry_ids)
    end

    def update_country
      existing_country = specialist.country
      country = Country.find_by(uid: attributes[:country]) || Country.find_by(alpha2: attributes[:country]) || Country.find_by(name: attributes[:country])
      specialist.country_id = country&.id
      @subscribe_to_labels += Label.where(country_id: country&.id)
      @unsubscribe_from_labels += Label.where(country_id: existing_country&.id)
    end

    def update_subscriptions
      @subscribe_to_labels.each { |label| specialist.subscribe_to!(label) }
      @unsubscribe_from_labels.each { |label| specialist.unsubscribe_from!(label) }
    end
  end
end
