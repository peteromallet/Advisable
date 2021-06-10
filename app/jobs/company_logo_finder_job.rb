# frozen_string_literal: true

require "open-uri"

class CompanyLogoFinderJob < ApplicationJob
  queue_as :default

  def perform(company, force: false)
    return if company.website.blank? || (company.logo.present? && !force)

    @company = company
    iconuri = shortcut_uri
    filename = File.basename(iconuri.path)
    file = iconuri.open
    company.logo.attach(io: file, filename: filename)
  end

  def shortcut_uri
    uri = URI.parse(@company.website)
    uri.path = "/"
    res = Faraday.get(uri)
    doc = Nokogiri::HTML(res.body)
    icons = doc.xpath('//link[@rel="icon" or @rel="shortcut icon"]')
    return unless icons.any?

    biggest = icons.max_by { |i| i.attributes["sizes"]&.value.to_i }
    selected = biggest.presence || icons.first
    iconuri = URI.parse(selected["href"])
    iconuri.host = uri.host if iconuri.host.blank?
    iconuri
  end
end
