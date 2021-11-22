# frozen_string_literal: true

module Types
  module ReviewInterface
    include Types::BaseInterface

    description "Fields that are common for all Review types"

    field :id, ID, null: false, method: :uid
    field :name, String, null: true
    field :comment, String, null: true
    field :type, String, null: true
    field :ratings, Types::Ratings, null: true
    field :specialist, Types::SpecialistType, null: false
    field :company_name, String, null: true
    field :relationship, String, null: true

    field :avatar, String, null: true
    def avatar
      object.resized_avatar_url
    end

    orphan_types Types::CaseStudyArticleReview

    definition_methods do
      def resolve_type(object, _)
        if object.case_study_article_id
          Types::CaseStudyArticleReview
        else
          Types::Review
        end
      end
    end
  end
end
