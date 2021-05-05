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
          image = get_resized_image(public_send(name), options)
          get_resized_image_url(image, options)
        end
      end
    end

    def resize_many(attachments)
      attachments.each do |name, options|
        # TODO
      end
    end
  end

  private

  def get_resized_image(image, options)
    return if image.blank?

    if image.variant(options).processed?
      image.variant(options)
    else
      # TODO: This needs fixing because we don't have name
      ResizeImageJob.perform_later(self, name, **options)
      image
    end
  rescue ActiveStorage::InvariableError
    image.purge
    Sentry.capture_message("Deleted image that wasn't really an image", level: "debug", extra: {object_class: self.class.name, object_id: id, image: name})
    nil
  end

  def get_resized_image_url(image, _options)
    return if image.blank?

    if image.respond_to?(:variation)
      Rails.application.routes.url_helpers.rails_representation_url(image, host: Advisable::Application::ORIGIN_HOST)
    else
      Rails.application.routes.url_helpers.rails_blob_url(image, host: Advisable::Application::ORIGIN_HOST)
    end
  end
end
