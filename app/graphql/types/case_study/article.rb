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

      field :company, Company, null: true do
        authorize :read_company?
      end
      def company
        dataloader.with(::ActiveRecordSource, ::CaseStudy::Company).load(object.company_id)
      end

      field :skills, [Skill], null: true
      def skills
        object.skills.order(created_at: :asc)
      end

      field :cover_photo, String, null: true
      def cover_photo
        object.cover_photo.url
      end

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

      field :is_saved, Boolean, null: false
      def is_saved
        object.saved_articles.exists?(user: current_user)
      end

      field :is_archived, Boolean, null: false
      def is_archived
        object.archived_articles.exists?(user: current_user)
      end

      field :shares, [SharedArticle], null: true
      field :review, Types::CaseStudyArticleReview, null: false
    end
  end
end
