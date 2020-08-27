class Types::Guild::PostUnion < Types::BaseUnion
  description "Represents a Guild Post"
  possible_types Types::Guild::PostType, Types::Guild::Post::AdviceRequiredType

  UNION_TYPES = %w[
    AdviceRequired
    CaseStudy
    Opportunity
  ].freeze

  def self.resolve_type(object, context)
    if UNION_TYPES.include?(object.type)
      "Types::Guild::Post::#{object.type}Type".constantize
    else
      Types::Guild::PostType
    end
  end
end