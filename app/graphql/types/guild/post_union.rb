# class Types::Guild::PostUnion < Types::BaseUnion
#   description "Represents a Guild Post"
#   possible_types Types::Guild::Post::GeneralType, Types::Guild::Post::AdviceRequiredType

#   UNION_TYPES = %w[
#     AdviceRequired
#     CaseStudy
#     Opportunity
#     General
#   ].freeze

#   def self.resolve_type(object, context)
#     if UNION_TYPES.include?(object.type)
#       "Types::Guild::Post::#{object.type}Type".constantize
#     else
#       raise "Unexpected Post Type: #{object.inspect}"
#     end
#   end
# end