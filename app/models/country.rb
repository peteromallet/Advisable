class Country < ApplicationRecord
  include Uid
  has_many :specialists
  validates_presence_of :name

  # We use Countries gem to load additional information about the country
  def data
    @data ||= ISO3166::Country.find_country_by_name(name_stripped)
  end

  def name_stripped
    name.gsub(/\s\(.*\)$/, '')
  end
end
