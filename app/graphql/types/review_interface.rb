# frozen_string_literal: true

module Types
  module ReviewInterface
    include Types::BaseInterface

    description "Fields that are common for all Review types"

    field :id, ID, null: false, method: :uid
    field :comment, String, null: true
    field :type, String, null: true
    field :ratings, Types::Ratings, null: true
    field :specialist, Types::SpecialistType, null: false
    field :company_name, String, null: true
    field :relationship, String, null: true

    field :avatar, String, null: true
    def avatar
      if object.avatar.attached?
        object.resized_avatar_url
      else
        object.project&.resized_contact_image_url
      end
    end

    field :name, String, null: true
    def name
      if object.name.present?
        object.name
      else
        object.project&.confidential? ? nil : object.project.contact_name
      end
    end

    orphan_types Types::PreviousProjectReview, Types::CaseStudyArticleReview

    definition_methods do
      def resolve_type(object, _)
        if object.project_id.present?
          Types::PreviousProjectReview
        else
          Types::Review
        end
      end
    end
  end
end
