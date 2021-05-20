# frozen_string_literal: true

module Types
  module Guild
    module Post
      class CaseStudyType < Types::BaseType
        graphql_name "GuildPostCaseStudy"

        implements Types::Guild::PostInterface

        def title
          object.article&.title
        end

        def excerpt
          object.article&.excerpt
        end

        field :article, Types::CaseStudy::Article, null: true
      end
    end
  end
end
