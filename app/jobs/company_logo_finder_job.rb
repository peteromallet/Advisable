# frozen_string_literal: true

class CompanyLogoFinderJob < ApplicationJob
  queue_as :default

  def perform(company, force: false)
    return if company.website.blank? || (company.logo.present? && !force)

    @company = company
    iconuri = shortcut_uri
    filename = File.basename(iconuri.path)
    res = Faraday.new(url: iconuri) { |f| f.use(FaradayMiddleware::FollowRedirects) }.get
    return unless res.status == 200

    tempfile = Tempfile.new(filename, binmode: true)
    tempfile.write(res.body)
    tempfile.close
    company.logo.attach(io: File.open(tempfile.path), filename: filename)
  end

  private

  def shortcut_uri
    uri = URI.parse(@company.website)
    uri.path = "/"
    res = Faraday.get(uri)
    doc = Nokogiri::HTML(res.body)
    icons = doc.xpath('//link[@rel="icon" or @rel="shortcut icon"]')

    if icons.any?
      biggest = icons.max_by { |i| i.attributes["sizes"]&.value.to_i }
      selected = biggest.presence || icons.first
      iconuri = URI.parse(selected["href"])
      iconuri.host = uri.host if iconuri.host.blank?
    else
      iconuri = uri
      iconuri.path = "/favicon.ico"
    end
    iconuri
  end
end
