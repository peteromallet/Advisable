# frozen_string_literal: true

module Types
  module Guild
    module Post
      class CaseStudyType < Types::BaseType
        graphql_name "GuildPostCaseStudy"

        implements Types::Guild::PostInterface

        field :article, Types::CaseStudy::Article, null: true
      end
    end
  end
end
