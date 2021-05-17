require 'open-uri'

# TODO: Delete once all production jobs are processed
class GeocodeUserJob < ApplicationJob
  queue_as :default

  def perform(id, ip)
    Sentry.capture_message("THIS SHOULD NO LOGNER BE USED WTF")

    user = User.find(id)
    return unless user

    results = geocode_ip(ip)
    return if results.blank? || !results.first.respond_to?(:country)

    country = Country.where.not(alpha2: nil).find_by(alpha2: results.first.country)
    user.country = country
    user.company.address = {city: results.first.city, country: results.first.country}
    user.sync_to_airtable
  end

  private

  def geocode_ip(ip)
    if Rails.env.development?
      [OpenStruct.new(country: 'IE', city: 'Dublin')]
    else
      Geocoder.search(ip)
    end
  end
end
