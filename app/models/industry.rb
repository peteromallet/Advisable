# frozen_string_literal: true

class Industry < ApplicationRecord
  include Uid

  has_many :project_industries, dependent: :destroy
  has_many :previous_projects, through: :project_industries, source: :project, source_type: 'PreviousProject'
  has_many :skills, -> { distinct }, through: :previous_projects
  has_many :companies, dependent: :nullify
  has_one :label, required: false, dependent: :nullify
  has_many :specialist_industries, dependent: :destroy
  has_many :case_study_industries, class_name: "CaseStudy::Industry", dependent: :destroy

  validates :name, presence: true

  before_validation :set_color, on: :create

  scope :active, -> { where(active: true) }

  COLORS = %w[neutral blue purple cyan green yellow orange red].freeze

  def set_color
    return if color.present?

    self.color = COLORS.sample
  end
end

# == Schema Information
#
# Table name: industries
#
#  id          :bigint           not null, primary key
#  active      :boolean
#  color       :string
#  name        :string
#  uid         :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  airtable_id :string
#
# Indexes
#
#  index_industries_on_uid  (uid)
#
