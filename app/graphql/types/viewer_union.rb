class Types::ViewerUnion < Types::BaseUnion
  description "Represents a viewer"
  possible_types Types::User, Types::SpecialistType

  def self.resolve_type(object, context)
    if object.is_a?(Specialist)
      Types::SpecialistType
    else
      Types::User
    end
  end
end