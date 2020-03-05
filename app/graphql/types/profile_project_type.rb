class Types::ProfileProjectType < Types::BaseType
  field :id, ID, null: false
  field :industry, Types::IndustryType, null: true
  field :title, String, null: false
  field :company_name, String, null: false
  field :company_type, String, null: false
  field :excerpt, String, null: true
  field :description, String, null: true
  field :skills, [Types::Skill], null: false
  field :industries, [Types::IndustryType], null: false
  field :reviews, [Types::Review], null: false
  field :specialist, Types::SpecialistType, null: true

  def id
    object.project.uid
  end

  def title
    "#{primary_skill.name} with #{company_name}"
  end

  def industry
    Industry.find_by_name(project.industry)
  end

  def company_type
    return project.user.company_type if project.is_a?(Project)
    project.company_type
  end

  def company_name
    return project.user.company_name if project.is_a?(Project)
    return "#{industry.name} #{company_type}" if project.confidential?
    project.client_name
  end

  def excerpt
    project.description.try(:truncate, 160)
  end

  def description
    project.description
  end

  def skills
    project.skills
  end

  def industries
    if project.is_a?(Project)
      return [] if project.industry.nil?
      return [Industry.find_by_name(project.industry)]
    end

    project.industries
  end

  # At the moment the underlying object is a PreviousProject so we can simply call the reviews method for now
  def reviews
    object.reviews
  end

  private

  def project
    object.project
  end

  def primary_skill
    Skill.find_by_name(project.primary_skill)
  end
end
