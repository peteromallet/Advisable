# frozen_string_literal: true

class Country < ApplicationRecord
  include Uid

  has_many :specialists, dependent: :nullify
  has_one :label, required: false, dependent: :nullify

  validates :name, presence: true

  # We use Countries gem to load additional information about the country
  def data
    @data ||= ISO3166::Country.find_country_by_any_name(name_stripped)
  end

  def name_stripped
    name.gsub(/\s\(.*\)$/, "")
  end
end

# == Schema Information
#
# Table name: countries
#
#  id             :bigint           not null, primary key
#  alpha2         :string
#  currency       :string
#  dial_in_number :string
#  eu             :boolean
#  name           :string
#  uid            :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  airtable_id    :string
#
# Indexes
#
#  index_countries_on_uid  (uid) UNIQUE
#
