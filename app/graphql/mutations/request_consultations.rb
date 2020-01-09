class Mutations::RequestConsultations < Mutations::BaseMutation
  argument :skill, String, required: true
  argument :specialists, [ID], required: true

  field :consultations, [Types::ConsultationType], null: true

  def authorized?(specialists:, skill:)
    return true if context[:current_user].present?

    if context[:current_user].nil?
      raise ApiError::NotAuthenticated.new('You are not logged in')
    end

    if context[:current_user].is_a?(Specialist)
      raise ApiError::InvalidRequest.new(
              'viewerIsSpecialist',
              'You are logged in as a specialist'
            )
    end
  end

  def resolve(specialists:, skill:)
    ActiveRecord::Base.transaction do
      consultations =
        specialists.map do |id|
          consultation =
            Consultation.create(
              user: context[:current_user],
              specialist: Specialist.find_by_uid_or_airtable_id!(id),
              skill: Skill.find_by_name!(skill),
              status: 'Request Started'
            )

          consultation.sync_to_airtable
          consultation
        end

      { consultations: consultations }
    end
  end
end
