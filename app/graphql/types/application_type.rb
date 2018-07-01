class Types::ApplicationType < Types::BaseType
  field :id, ID, null: false
  field :rate, String, null: true
  field :availability, String, null: true
  field :specialist, Types::SpecialistType, null: true
  field :status, String, null: true
  field :introduction, String, null: true
  field :questions, [Types::ApplicationQuestionType, null: true], null: true
  field :project, Types::ProjectType, null: false
end
