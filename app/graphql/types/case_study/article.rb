# frozen_string_literal: true

module Types
  module CaseStudy
    class Article < Types::BaseType
      graphql_name "CaseStudyArticle"
      description "Type definition for CaseStudy::Article"

      field :id, ID, null: false, method: :uid

      field :specialist, Types::SpecialistType, null: true
      def specialist
        dataloader.with(::ActiveRecordSource, ::Specialist).load(object.specialist_id)
      end

      field :editor_url, String, null: true
      def editor_url
        policy = ::CaseStudy::ArticlePolicy.new(current_user, object)
        object.editor_url if policy.update?
      end

      field :company, Company, null: true
      def company
        policy = ::CaseStudy::ArticlePolicy.new(current_user, object)
        dataloader.with(::ActiveRecordSource, ::CaseStudy::Company).load(object.company_id) if policy.read_company?
      end

      field :path, String, null: false

      field :skills, [Skill], null: true
      def skills
        object.skills.order(created_at: :asc)
      end

      field :cover_photo, String, null: true
      def cover_photo
        object.cover_photo.url
      end

      field :slug, String, null: true
      field :industries, [Industry], null: true
      field :title, String, null: true
      field :subtitle, String, null: true
      field :excerpt, String, null: true
      field :comment, String, null: true
      field :company_type, [String], null: true
      field :score, Int, null: true
      field :confidential, Boolean, null: true
      field :goals, [String], null: true
      field :published_at, GraphQL::Types::ISO8601DateTime, null: true
      field :specialist_approved_at, GraphQL::Types::ISO8601DateTime, null: true

      field :sections, [Section], null: true
      def sections
        object.sections.by_position
      end

      field :images, [Types::CaseStudy::Image], null: false
      def images
        object.contents.where(type: "CaseStudy::ImagesContent").flat_map(&:images)
      end

      field :is_archived, Boolean, null: false do
        argument :search, ID, required: true
      end
      def is_archived(search:)
        search = CaseStudy::Search.find_by!(uid: search)
        search.archived.include?(object.id)
      end

      field :is_favorited, Boolean, null: false
      def is_favorited
        # this only runs single query even when we have many articles so don't use exists? or similar
        current_user.account.favorited_articles.any? { |fa| fa.article_id == object.id }
      end

      field :similar, [Article], null: false
      field :shares, [SharedArticle], null: true
      field :review, Types::CaseStudyArticleReview, null: true
    end
  end
end
