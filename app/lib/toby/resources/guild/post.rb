# frozen_string_literal: true

module Toby
  module Resources
    module Guild
      class Post < BaseResource
        model_name ::Guild::Post
        attribute :title, Attributes::String
        attribute :specialist, Attributes::BelongsTo
        attribute :body, Attributes::LongText
        attribute :resolved_at, Attributes::DateTime, readonly: true
        attribute :boosted_at, Attributes::DateTime, readonly: true
        attribute :created_at, Attributes::DateTime, readonly: true
        attribute :updated_at, Attributes::DateTime, readonly: true
        attribute :labels, Attributes::HasManyThrough

        action :boost, label: "Boost post", if: ->(post) { post.boosted_at.nil? }

        def self.boost(object, _context)
          return if object.boosted_at?

          object.boost!
        end

        def self.label(record, context)
          Lazy::Label.new(::Guild::Post, record.id, context, value_column: :title)
        end

        def self.search(query)
          ::Guild::Post.where("title ILIKE ?", "%#{query}%")
        end
      end
    end
  end
end
