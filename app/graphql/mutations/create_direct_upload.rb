class Mutations::CreateDirectUpload < Mutations::BaseMutation
  include Rails.application.routes.url_helpers
  
  class DirectUpload < Types::BaseType
    field :url, String, "Upload URL", null: false
    field :headers, String,
          "HTTP request headers (JSON-encoded)",
          null: false
    field :blob_id, ID, "Created blob record ID", null: false
    field :signed_blob_id, ID,
          "Created blob record signed ID",
          null: false
  end

  argument :filename, String, required: true
  argument :byte_size, Int, required: true
  argument :checksum, String, required: true
  argument :content_type, String, required: true

  field :direct_upload, DirectUpload, null: false

  def resolve(**args)
    blob = ActiveStorage::Blob.create_before_direct_upload!(args.to_h)

    {
      direct_upload: {
        url: blob.service_url_for_direct_upload,
        # NOTE: we pass headers as JSON since they have no schema
        headers: blob.service_headers_for_direct_upload.to_json,
        blob_id: blob.id,
        signed_blob_id: blob.signed_id
      }
    }
  end
end
