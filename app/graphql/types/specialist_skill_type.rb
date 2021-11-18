# frozen_string_literal: true

# The SpecialistSkill type represents a specialists association with a skill.
# Its important to note that the underlying object is not a SpecialistSkill
# record as a specialist can have skills from multiple places. The 'object'
# variable is an OpenStruct with the specialist and skill record. See the
# resolver for the specialist skills field.
module Types
  class SpecialistSkillType < Types::BaseType
    field :verified, Boolean, null: false

    field :id, ID, null: false

    def id
      skill.uid
    end

    field :name, String, null: false

    delegate :name, to: :skill

    delegate :skill, to: :object

    delegate :specialist, to: :object
  end
end
