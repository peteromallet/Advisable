class Mutations::SubmitClientApplication < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :talent_quality, String, required: true
  argument :locality_importance, Int, required: true
  argument :accept_guarantee_terms, Boolean, required: true

  field :clientApplication, Types::ClientApplicationType, null: true

  def authorize(**args)
    user = User.find_by_uid_or_airtable_id!(args[:id])
    if user.application_status != :started
      raise ApiError::InvalidRequest.new(
              'alreadySubmitted',
              'Application has already been submitted'
            )
    end
  end

  def resolve(**args)
    user = User.find_by_uid_or_airtable_id!(args[:id])
    user.locality_importance = args[:locality_importance]
    update_talent_quality(user, args[:talent_quality])
    update_guarantee_terms(user, args[:accept_guarantee_terms])

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

    user.application_status = application_status
    user.rejection_reason = rejection_reason

    if application_status == :accepted
      user.application_accepted_at = DateTime.now
    end

    if application_status == :rejected
      user.application_rejected_at = DateTime.now
    end

    user.save
    user.sync_to_airtable

    { clientApplication: user }
  end

  private

  def update_talent_quality(user, talent_quality)
    return unless talent_quality
    user.talent_quality = talent_quality.downcase
  end

  def update_guarantee_terms(user, accept)
    return if accept.nil?
    if accept
      user.accepted_guarantee_terms_at = DateTime.now
    else
      user.accepted_guarantee_terms_at = nil
    end
  end
end
