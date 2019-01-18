class Types::PreviousProjectUnion < Types::BaseUnion
  description "Represents a specialists project"
  possible_types Types::ProjectType, Types::OffPlatformProject

  def self.resolve_type(object, context)
    if object.is_a?(Project)
      Types::ProjectType
    else
      Types::OffPlatformProject
    end
  end
end