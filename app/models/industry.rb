# frozen_string_literal: true

class Industry < ApplicationRecord
  include Uid

  has_many :project_industries, dependent: :destroy
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
#  id          :integer          not null, primary key
#  name        :string
#  uid         :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  airtable_id :string
#  color       :string
#  active      :boolean
#
# Indexes
#
#  index_industries_on_uid  (uid) UNIQUE
#
