# frozen_string_literal: true

module Toby
  module Resources
    module CaseStudy
      class Article < BaseResource
        model_name ::CaseStudy::Article
        attribute :uid, Attributes::String, readonly: true
        attribute :title, Attributes::String
        attribute :deleted_at, Attributes::DateTime

        action :create_guild_post, label: "Post To Guild"

        def self.create_guild_post(object)
          Guild::CaseStudy.create_from_article!(object)
        end

        def self.label(record, context)
          Lazy::Label.new(::CaseStudy::Article, record.id, context, value_column: :title)
        end

        def self.search(query)
          ::CaseStudy::Article.where("title ILIKE ?", "%#{query}%")
        end
      end
    end
  end
end
