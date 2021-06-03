# frozen_string_literal: true

module Mutations
  module CaseStudy
    class ArchiveSharedArticle < Mutations::BaseMutation
      description "Archive a Shared Case Study Article."
      graphql_name "ArchiveCaseStudySharedArticle"

      argument :shared_article, ID, required: true
      argument :unarchive, Boolean, required: false

      field :shared_article, Types::CaseStudy::SharedArticle, null: false

      def authorized?(shared_article:, **_args)
        requires_client!
        shared_article = ::CaseStudy::SharedArticle.find_by!(uid: shared_article)
        policy = ::CaseStudy::SharedArticlePolicy.new(current_user, shared_article)
        return true if policy.archive?

        ApiError.not_authorized("You do not have permission to archive this shared article")
      end

      def resolve(shared_article:, **args)
        shared_article = ::CaseStudy::SharedArticle.find_by!(uid: shared_article)
        archived_at = args[:unarchive] == true ? nil : Time.zone.now

        current_account_responsible_for { shared_article.update!(archived_at: archived_at) }

        {shared_article: shared_article}
      end
    end
  end
end
