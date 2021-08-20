# frozen_string_literal: true

class CompanyFaviconFinderJob < ApplicationJob
  attr_reader :company, :company_website, :icons

  queue_as :default

  def perform(company, force: false)
    company.favicon = nil if force
    return if company.website.blank? || company.favicon.present?

    @company = company
    @company_website = parse_company_website
    @icons = icons_from_meta

    find_favicon if icons.any?
    try_favicon_ico if company.favicon.blank?
  end

  def icons_from_meta
    res = Faraday.new(url: company_website) { |f| f.use(FaradayMiddleware::FollowRedirects) }.get
    doc = Nokogiri::HTML(res.body)
    doc.xpath('//link[@rel="icon" or @rel="shortcut icon" or @rel="apple-touch-icon" or @rel="apple-touch-icon-precomposed"]')
  end

  def find_favicon
    icons_by_size = icons.sort_by { |i| i.attributes["sizes"]&.value.to_i }

    while company.favicon.blank? && icons_by_size.any?
      icon = icons_by_size.pop
      fetch_favicon(icon["href"])
    end
  end

  def fetch_favicon(href)
    if href.starts_with?("data:")
      favicon_from_base64(href)
    else
      href = "http:#{href}" if href.starts_with?("//")
      href.gsub("../", "")
      iconuri = URI.parse(href)
      if iconuri.host.blank?
        path = iconuri.path
        iconuri = company_website.dup
        iconuri.path = path
      end
      favicon_from_uri(iconuri)
    end
  rescue URI::InvalidComponentError
    fetch_favicon("/#{href}")
  end

  def try_favicon_ico
    iconuri = company_website
    iconuri.path = "/favicon.ico"
    favicon_from_uri(iconuri)
  end

  def favicon_from_uri(iconuri)
    filename = File.basename(iconuri.path)
    res = Faraday.new(url: iconuri) { |f| f.use(FaradayMiddleware::FollowRedirects) }.get
    return if !res.success? || res.headers["content-type"].exclude?("image")

    attach_favicon(filename, res.body)
  end

  def favicon_from_base64(data)
    m = %r{data:image/(\w+);base64,(.+)}.match(data)
    attach_favicon("favicon.#{m[1]}", Base64.decode64(m[2]))
  end

  def attach_favicon(filename, data)
    tempfile = Tempfile.new(filename, binmode: true)
    tempfile.write(data)
    tempfile.close
    company.favicon.attach(io: File.open(tempfile.path), filename: filename)
  end

  def parse_company_website
    uri = URI.parse(company.website)
    case uri
    when URI::HTTP, URI::HTTPS
      uri.path = "/"
    when URI::Generic
      # https://rubular.com/r/jcPny2GqaBObpW
      domain = company.website.match(%r{(?<protocol>https?:)?(?<slashes>//)?(?<domain>\w*\.\w*)/?.*$})[:domain]
      uri = URI.parse("http://#{domain}")
    else
      raise "unsupported url class (#{url.class}) for #{url}"
    end
    uri
  end
end
