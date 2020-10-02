# frozen_string_literal: true

class Oauth < SimpleDelegator
  def identifiers
    @identifiers ||= {provider: provider, uid: uid}
  end

  def identifiers_with_blob
    @identifiers_with_blob ||= identifiers.merge(blob: self)
  end

  def identifiers_with_blob_and_token
    @identifiers_with_blob_and_token ||= identifiers_with_blob.merge(
      token: token,
      refresh_token: refresh_token,
      expires_at: Time.at(expires_at)
    )
  end

  %i[first_name last_name].each do |info|
    define_method(info) { dig(:info, info) }
  end

  %i[token refresh_token expires_at].each do |credential|
    define_method(credential) { dig(:credentials, credential) }
  end
end
