class Types::PreviousProject < Types::BaseType
  field :id, ID, null: false
  field :title, String, null: false
  field :goal, String, null: true
  field :excerpt, String, null: true
  field :description, String, null: true
  field :company_name, String, null: false
  field :company_type, String, null: false
  field :specialist, Types::SpecialistType, null: false
  field :reviews, [Types::Review], null: false
  field :primary_skill, Types::Skill, null: false
  field :primary_industry, Types::IndustryType, null: false
  field :skills, [Types::Skill], null: false
  field :industries, [Types::IndustryType], null: false
  field :validation_status, String, null: true
  field :on_platform, Boolean, null: false

  def id
    object.uid
  end

  def on_platform
    object.on_platform?
  end

  def title
    "#{object.primary_skill.try(:name)} with #{company_name}"
  end

  def excerpt
    object.description.try(:truncate, 160)
  end

  def company_name
    if object.confidential
      return(
        "#{object.primary_industry.try(:name)} #{
          object.company_type || 'company'
        }"
      )
    end

    object.client_name
  end
end
