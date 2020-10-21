class Types::Guild::TopicableUnion < Types::BaseUnion
  graphql_name "GuildTopicableUnion"

  description 'Represents either a Skill, Industry or Country'
  possible_types Types::Skill, Types::IndustryType, Types::CountryType

  def self.resolve_type(object, _context)
    case object.class.name
    when "Skill" then Types::Skill
    when "Industry" then Types::IndustryType
    when "Country" then Types::CountryType
    else
      raise "Unknown topicable type"
    end
  end
end
