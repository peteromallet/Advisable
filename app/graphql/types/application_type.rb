class Types::ApplicationType < Types::BaseType
  field :id, ID, null: false
  field :rate, String, null: true
  field :airtable_id, String, null: false
  field :featured, Boolean, null: true
  field :references_requested, Boolean, null: true
  field :availability, String, null: true
  field :specialist, Types::SpecialistType, null: true
  field :status, String, null: true
  field :comment, String, null: true
  field :introduction, String, null: true
  field :rejection_reason, String, null: true
  field :rejection_reason_comment, String, null: true
  field :questions, [Types::ApplicationQuestionType, null: true], null: true
  field :project, Types::ProjectType, null: false
  field :proposal, Types::Booking, null: true
  field :referral_url, String, null: true
  field :references, [Types::ApplicationReferenceType], null: false
end
