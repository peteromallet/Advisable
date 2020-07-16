class Mutations::SubmitClientApplication < Mutations::BaseMutation
  argument :id, ID, required: true

  field :clientApplication, Types::ClientApplicationType, null: true

  def resolve(**args)
    user = User.find_by_uid_or_airtable_id!(args[:id])

    application_status = :accepted
    rejection_reason = nil

    if User::TALENT_QUALITY_OPTIONS.first(2).include?(user.talent_quality)
      application_status = :rejected
      rejection_reason = 'cheap_talent'
    end

    if user.number_of_freelancers == '0'
      application_status = :rejected
      rejection_reason = 'not_hiring'
    end

    user.update(
      application_status: application_status, rejection_reason: rejection_reason
    )

    user.sync_to_airtable

    { clientApplication: user }
  end
end
