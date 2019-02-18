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
  field :accepts_fee, Boolean, null: true
  field :accepts_terms, Boolean, null: true
  field :previous_projects, [Types::PreviousProject], null: false do
    argument :fallback, Boolean, required: false
  end

  # When querying for an applications previous_projects, we can pass a 'fallback'
  # argument which when true will fall back to returning all of the specialists
  # previous proejcts if there are none specifically related to the application
  # through references. This argument defaults to true.
  def previous_projects(fallback: true)
    references = ::PreviousProject.for_application(object)

    if fallback && references.empty?
      references = ::PreviousProject.for_specialist(object.specialist)
    end

    references
  end
end
