# frozen_string_literal: true

module Mutations
  module CaseStudy
    class FavoriteArticle < Mutations::BaseMutation
      graphql_name "FavoriteCaseStudyArticle"

      argument :article, ID, required: true

      field :article, Types::CaseStudy::Article, null: false

      def authorized?(**_args)
        requires_current_user!
      end

      def resolve(article:)
        article = ::CaseStudy::Article.find_by!(uid: article)
        ::CaseStudy::FavoritedArticle.find_or_create_by!(account: current_user.account, article:)
        track_event("Favorited Article", {article: article.uid})

        {article:}
      end
    end
  end
end
