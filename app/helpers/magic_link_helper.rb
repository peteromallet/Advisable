# frozen_string_literal: true

module MagicLinkHelper
  def magic_link(account, url, expires_at: nil)
    ml = MagicLink.create!(path: url, account:, expires_at:)
    uri = URI.parse(url)
    uri.query = [uri.query, "mlt=#{ml.token}", "mluid=#{account.uid}"].compact.join("&")
    uri.to_s
  end
end
