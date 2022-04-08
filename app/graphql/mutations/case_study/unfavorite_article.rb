# frozen_string_literal: true

module Mutations
  module CaseStudy
    class UnfavoriteArticle < Mutations::BaseMutation
      graphql_name "UnfavoriteCaseStudyArticle"

      argument :article, ID, required: true

      field :article, Types::CaseStudy::Article, null: false

      def authorized?(**_args)
        requires_client!
      end

      def resolve(article:)
        article = ::CaseStudy::Article.find_by!(uid: article)
        ::CaseStudy::FavoritedArticle.where(account: current_user.account, article:).destroy_all
        {article:}
      end
    end
  end
end
