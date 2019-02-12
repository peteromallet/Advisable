# Represents an ApplicationReference
class Types::ApplicationReferenceType < Types::BaseType
  class ProjectUnion < Types::BaseUnion
    possible_types Types::ProjectType, Types::OffPlatformProject

    def self.resolve_type(object, context)
      if object.is_a?(Project)
        Types::ProjectType
      else
        Types::OffPlatformProject
      end
    end
  end

  field :id, ID, null: false
  field :project, ProjectUnion, null: true

  def id
    object.uid
  end
end