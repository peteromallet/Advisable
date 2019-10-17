class OffPlatformProject < ApplicationRecord
  include Uid
  include Airtable::Syncable
  belongs_to :specialist
  has_many :reviews, as: :project
  has_many :project_skills, as: :project
  has_many :skills, through: :project_skills
  uid_prefix "opp"

  scope :validated, -> { where(validation_status: "Validated" )}

  # Every time a project is created, updated or destroyed we want to update the
  # associated specialists project count.
  after_save :update_specialist_project_count
  after_destroy :update_specialist_project_count

  def contact_name
    "#{contact_first_name} #{contact_last_name}"
  end

  def contact_name=(name)
    self.contact_first_name = name.split(" ").try(:[], 0)
    self.contact_last_name = name.split(" ").try(:[], 1)
  end

  private

  # Update the associated specialists project count
  def update_specialist_project_count
    return unless specialist.present?
    specialist.update_project_count
  end
end
