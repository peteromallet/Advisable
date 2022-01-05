# frozen_string_literal: true

# Monkey patch to skip direct upload token verification
module ActiveStorage
  module DirectUploadToken
    def verify_direct_upload_token(_token, _attachment_name, _session)
      raise "This still valid?" if Rails.version != "7.0.0"

      ActiveStorage::Blob.service.name
    end
  end
end
