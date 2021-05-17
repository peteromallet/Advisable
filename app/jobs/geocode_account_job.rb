require 'open-uri'

class GeocodeAccountJob < ApplicationJob
  attr_reader :account, :geocoded_ip, :country

  queue_as :default

  def perform(account, ip)
    @account = account
    @geocoded_ip = geocode(ip)
    return if geocoded_ip.blank? || geocoded_ip&.country.blank?

    @country = Country.find_by(alpha2: geocoded_ip.country)
    geocode_user if account.user
    geocode_specialist if account.specialist
  end

  private

  def geocode_user
    user = account.user
    user.country = country
    user.company.address = {city: geocoded_ip.city, country: geocoded_ip.country}
    user.sync_to_airtable
  end

  def geocode_specialist
    specialist = account.specialist
    specialist.country = country
    specialist.sync_to_airtable
  end

  def geocode(ip)
    if Rails.env.development?
      OpenStruct.new(country: 'IE', city: 'Dublin')
    else
      Geocoder.search(ip)&.first
    end
  end
end
