class Mutations::UpdateClientApplication < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :company_name, String, required: false
  argument :industry, String, required: false
  argument :skills, [String], required: false
  argument :company_type, String, required: false
  argument :budget, Int, required: false
  argument :locality_importance, Int, required: false
  argument :talent_quality, String, required: false
  argument :accept_guarantee_terms, Boolean, required: false

  field :clientApplication, Types::ClientApplicationType, null: true

  def resolve(**args)
    user = User.find_by_uid_or_airtable_id!(args[:id])
    user.company_name = args[:company_name] if args[:company_name]
    user.company_type = args[:company_type] if args[:company_type]
    user.budget = args[:budget] if args[:budget]
    if args[:locality_importance]
      user.locality_importance = args[:locality_importance]
    end
    update_talent_quality(user, args[:talent_quality])
    update_industry(user, args[:industry]) if args[:industry]
    update_skills(user, args[:skills]) if args[:skills]
    update_guarantee_terms(user, args[:accept_guarantee_terms])
    user.save

    { clientApplication: user }
  end

  private

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
