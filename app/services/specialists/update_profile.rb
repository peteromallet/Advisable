# Service object to update a specialists profile. This is primarily
# used by the graphql update_profile mutation.
class Specialists::UpdateProfile < ApplicationService
  attr_accessor :specialist, :attributes

  def initialize(specialist:, attributes:)
    @specialist = specialist
    @attributes = attributes
  end

  def call
    specialist.assign_attributes(assignable_attributes)
    attach_avatar
    update_skills
    update_country

    if specialist.save
      specialist.sync_to_airtable
      specialist
    else
      raise Service::Error.new(specialist.errors.full_messages.first)
    end
  end

  private

  # Select only the attributes we want to pass through to active record
  # assign_atttributes call
  def assignable_attributes
    attributes.slice(:bio, :city, :remote, :primarily_freelance, :hourly_rate, :number_of_projects)
  end

  def attach_avatar
    return unless attributes[:avatar]
    specialist.avatar.attach(attributes[:avatar])
  end

  # Update the specialists skills if a skills attribute was passed.
  def update_skills
    return unless attributes[:skills]
    skills = Skill.where(name: attributes[:skills])
    specialist.skill_ids = skills.map(&:id)
  end

  # Update the country if it was passed
  def update_country
    return unless attributes[:country]
    cntry = ISO3166::Country.new(attributes[:country])
    return unless cntry
    country = Country.find_by_name(cntry.name)
    specialist.country = country
  end
end