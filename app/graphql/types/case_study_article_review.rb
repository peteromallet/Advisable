# frozen_string_literal: true

module Types
  class CaseStudyArticleReview < Types::BaseType
    implements Types::ReviewInterface

    include PreviousProjectHelper

    description 'A type for CaseStudy Article Review'

    field :case_study_article, Types::CaseStudy::Article, null: false
  end
end
