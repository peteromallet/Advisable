# frozen_string_literal: true

class Country < ApplicationRecord
  include Uid

  has_many :specialists, dependent: :nullify
  has_one :label, required: false, dependent: :nullify

  validates :name, presence: true

  # We use Countries gem to load additional information about the country
  def data
    @data ||= ISO3166::Country.find_country_by_name(name_stripped)
  end

  def name_stripped
    name.gsub(/\s\(.*\)$/, "")
  end
end

# == Schema Information
#
# Table name: countries
#
#  id             :integer          not null, primary key
#  name           :string
#  currency       :string
#  airtable_id    :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  uid            :string           not null
#  eu             :boolean
#  alpha2         :string
#  dial_in_number :string
#
# Indexes
#
#  index_countries_on_uid  (uid) UNIQUE
#
