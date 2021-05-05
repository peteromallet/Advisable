# frozen_string_literal: true

class Skill < ApplicationRecord
  include ::Airtable::Syncable
  include Uid

  has_many :specialist_skills, dependent: :destroy
  has_many :specialists, through: :specialist_skills
  has_many :user_skills, dependent: :destroy
  has_many :users, through: :user_skills
  has_many :project_skills, dependent: :destroy
  has_many :previous_projects, through: :project_skills, source: :project, source_type: 'PreviousProject'
  has_many :consultations, dependent: :destroy
  has_many :case_study_skills, class_name: "CaseStudy::Skill", dependent: :destroy
  has_one :label, required: false, dependent: :nullify

  validates :name, presence: true
  validates :airtable_id, presence: true

  scope :popular, -> { order(projects_count: :desc, specialists_count: :desc) }

  # rubocop:disable Rails/SkipsModelValidations
  def merge_with!(duplicate:)
    Sentry.capture_message("Merging skills!", level: "debug", extra: {original: id, duplicate: duplicate.id})

    ActiveRecord::Base.transaction do
      duplicate.specialist_skills.update_all(skill_id: id)
      duplicate.user_skills.update_all(skill_id: id)
      duplicate.project_skills.update_all(skill_id: id)
      duplicate.consultations.update_all(skill_id: id)

      if duplicate.label&.labelings&.any?
        if label
          duplicate.label&.labelings&.update_all(label_id: label.id)
          duplicate.label&.destroy
        else
          duplicate.label.update(skill_id: id)
          duplicate.reload
        end
      end

      duplicate.update_columns(airtable_id: nil)
      duplicate.reload

      duplicate.destroy
      Skill.reset_counters(id, :specialist_skills, :project_skills)
    end
  end
  # rubocop:enable Rails/SkipsModelValidations
end

# == Schema Information
#
# Table name: skills
#
#  id                         :bigint           not null, primary key
#  active                     :boolean
#  category                   :string
#  characteristic_placeholder :string
#  goal_placeholder           :string
#  name                       :string
#  profile                    :boolean
#  projects_count             :integer          default(0)
#  specialists_count          :integer          default(0)
#  uid                        :string
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  airtable_id                :string
#
# Indexes
#
#  index_skills_on_airtable_id  (airtable_id) UNIQUE
#  index_skills_on_uid          (uid)
#
