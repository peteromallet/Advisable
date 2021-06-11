# frozen_string_literal: true

class CompanyFaviconFinderJob < ApplicationJob
  queue_as :default

  def perform(company, force: false)
    return if company.website.blank? || (company.favicon.present? && !force)

    @company = company
    iconuri = shortcut_uri
    filename = File.basename(iconuri.path)
    res = Faraday.new(url: iconuri) { |f| f.use(FaradayMiddleware::FollowRedirects) }.get
    return unless res.status == 200

    tempfile = Tempfile.new(filename, binmode: true)
    tempfile.write(res.body)
    tempfile.close
    company.favicon.attach(io: File.open(tempfile.path), filename: filename)
  end

  private

  def shortcut_uri
    uri = company_website
    res = Faraday.new(url: uri) { |f| f.use(FaradayMiddleware::FollowRedirects) }.get
    doc = Nokogiri::HTML(res.body)
    icons = doc.xpath('//link[@rel="icon" or @rel="shortcut icon" or @rel="apple-touch-icon" or @rel="apple-touch-icon-precomposed"]')

    if icons.any?
      biggest = icons.max_by { |i| i.attributes["sizes"]&.value.to_i }
      selected = biggest.presence || icons.first
      iconuri = URI.parse(selected["href"])
      if iconuri.host.blank?
        path = iconuri.path
        iconuri = uri
        iconuri.path = path
      end
    else
      iconuri = uri
      iconuri.path = "/favicon.ico"
    end
    iconuri
  end

  def company_website
    uri = URI.parse(@company.website)
    case uri
    when URI::HTTP, URI::HTTPS
      uri.path = "/"
    when URI::Generic
      # https://rubular.com/r/jcPny2GqaBObpW
      domain = @company.website.match(%r{(?<protocol>https?:)?(?<slashes>//)?(?<domain>\w*\.\w*)/?.*$})[:domain]
      uri = URI.parse("http://#{domain}")
    else
      raise "unsupported url class (#{url.class}) for #{url}"
    end
    uri
  end
end
