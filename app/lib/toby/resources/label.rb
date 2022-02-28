# frozen_string_literal: true

module Toby
  module Resources
    class Label < BaseResource
      model_name ::Label
      attribute :name, Attributes::String, readonly: true
      attribute :country, Attributes::BelongsTo
      attribute :skill, Attributes::BelongsTo
      attribute :industry, Attributes::BelongsTo
      attribute :published_at, Attributes::DateTime, readonly: true
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true

      action :publish, label: "Publish", if: ->(label) { label.published_at.nil? }
      action :unpublish, label: "Unpublish", if: ->(label) { label.published_at? }

      def self.publish(object, _context)
        return if object.published_at?

        object.update!(published_at: Time.zone.now)
      end

      def self.unpublish(object, _context)
        object.update!(published_at: nil)
      end

      def self.label(record, _context)
        record.name
      end

      def self.search(query)
        ::Label.where("name ILIKE ?", "%#{query}%")
      end
    end
  end
end
