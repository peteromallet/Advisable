class Mutations::UpdateClientApplication < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :company_name, String, required: false
  argument :industry, String, required: false
  argument :skills, [String], required: false
  argument :company_type, String, required: false
  argument :number_of_freelancers, String, required: false
  argument :budget, Int, required: false
  argument :locality_importance, Int, required: false
  argument :talent_quality, String, required: false
  argument :accept_guarantee_terms, Boolean, required: false

  field :clientApplication, Types::ClientApplicationType, null: true

  def resolve(**args)
    user = User.find_by_uid_or_airtable_id!(args[:id])

    if user.application_status == :started
      update_assignable_attributes(user, args)
      update_talent_quality(user, args[:talent_quality])
      update_industry(user, args[:industry]) if args[:industry]
      update_skills(user, args[:skills]) if args[:skills]
      update_guarantee_terms(user, args[:accept_guarantee_terms])
      user.save
      failed_to_save(user) if user.errors.any?
      user.sync_to_airtable
    end

    { clientApplication: user }
  end

  private

  def failed_to_save(user)
    message = user.errors.full_messages.first
    raise ApiError::InvalidRequest.new('failedToSave', message)
  end

  # which attributes can just be simply assigned
  def assignable_attributes
    %i[
      budget
      company_name
      company_type
      number_of_freelancers
      locality_importance
    ]
  end

  def update_assignable_attributes(user, args)
    assignable_attributes.each do |attribute|
      user.send("#{attribute}=", args[attribute]) if args[attribute]
    end
  end

  def update_talent_quality(user, talent_quality)
    return unless talent_quality
    user.talent_quality = talent_quality.downcase
  end

  def update_industry(user, industry)
    record = Industry.find_by_name!(industry)
    user.industry = record
  end

  def update_skills(user, skills)
    records = Skill.where(name: skills)
    user.skill_ids = records.map(&:id)
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
