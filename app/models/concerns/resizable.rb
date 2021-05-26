# frozen_string_literal: true

module Resizable
  extend ActiveSupport::Concern

  class_methods do
    def resize(attachments)
      attachments.each do |name, options|
        define_method "resized_#{name}" do
          image = public_send(name)
          get_resized_image(image, options)
        end

        define_method "resized_#{name}_url" do
          image = public_send("resized_#{name}")
          get_resized_image_url(image)
        end
      end
    end

    def resize_many(attachments)
      attachments.each do |name, options|
        define_method "resized_#{name}" do
          images = public_send(name)
          images.map do |image|
            get_resized_image(image, options)
          end
        end

        define_method "resized_#{name}_urls" do
          public_send("resized_#{name}_mapping").values
        end

        define_method "resized_#{name}_mapping" do
          mapping = instance_variable_get("@resized_#{name}_mapping")
          return mapping if mapping

          images = public_send("resized_#{name}")
          mapping = images.filter_map do |image|
            next if image.blob.blank?

            [image.blob.id, get_resized_image_url(image)]
          end.to_h
          instance_variable_set("@resized_#{name}_mapping", mapping)
        end
      end
    end
  end

  private

  def get_resized_image(image, options)
    return if image.blank?

    if image.variant(options).processed?
      image.variant(options)
    else
      image = image.attachment unless image.is_a?(ActiveStorage::Attachment)
      ResizeImageJob.perform_later(image, **options)
      image
    end
  rescue ActiveStorage::InvariableError
    image.purge
    Sentry.capture_message("Deleted image that wasn't really an image", level: "debug", extra: {object_class: self.class.name, object_id: id})
    nil
  end

  def get_resized_image_url(image)
    return if image.blank?

    if image.respond_to?(:variation)
      Rails.application.routes.url_helpers.rails_representation_url(image, host: Advisable::Application::ORIGIN_HOST)
    else
      Rails.application.routes.url_helpers.rails_blob_url(image, host: Advisable::Application::ORIGIN_HOST)
    end
  end
end
