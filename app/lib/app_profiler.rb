# frozen_string_literal: true

class AppProfilerAuthorizedMiddleware < AppProfiler::Middleware
  def before_profile(env, _params)
    request = ActionDispatch::Request.new(env)
    session_name = Rails.application.config.session_options[:key]
    uid = request.cookie_jar.encrypted[session_name]["account_uid"]

    Account.find_by(uid: uid)&.admin?
  end
end

module AppProfiler
  module Storage
    class S3Storage < BaseStorage
      class << self
        def upload(profile, _params = {})
          file = profile.file.open
          filename = File.join("profiling", profile.context.to_s, profile.file.basename)
          client = Aws::S3::Client.new

          ActiveSupport::Notifications.instrument(
            "s3_upload.app_profiler",
            file_size: file.size
          ) do
            client.put_object(
              body: StringIO.new(gzipped_reader(file).read),
              bucket: ENV["AWS_S3_BUCKET"],
              key: filename,
              content_type: "application/json",
              content_encoding: "gzip"
            )

            object = Aws::S3::Object.new(
              key: filename,
              bucket_name: ENV["AWS_S3_BUCKET"],
              client: client
            )

            OpenStruct.new(
              url: CGI.escape(object.presigned_url(:get, expires_in: 3600)),
              name: profile.file.basename
            )
          end
        end

        private

        def gzipped_reader(file)
          reader, writer = IO.pipe(binmode: true)
          Thread.new do
            writer.set_encoding("binary")
            gz = Zlib::GzipWriter.new(writer)
            # Default chunk size for gzip is 16384.
            gz.write(file.read(16384)) until file.eof?
            gz.close
          end
          reader
        end
      end
    end
  end
end
