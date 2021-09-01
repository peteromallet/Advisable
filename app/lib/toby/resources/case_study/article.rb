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
      end
    end
  end
end
