require 'open-uri'

class GeocodeUserJob < ApplicationJob
  queue_as :default

  def perform(id, ip)
    user = User.find(id)
    return unless user
    results = geocode_ip(ip)
    return unless results
    country =
      Country.where.not(alpha2: nil).find_by_alpha2(results.first.country)
    user.update(
      country: country,
      address: { city: results.first.city, country: results.first.country }
    )
    user.sync_to_airtable
  end

  private

  def geocode_ip(ip)
    if Rails.env.development?
      return [OpenStruct.new(country: 'IE', city: 'Dublin')]
    end

    Geocoder.search(ip)
  end
end
