# This class repsents the value for a previous projects "type" attribute. If you
# are looking for the graphql type for a previous project it is defined inside
# app/graphql/types/previous_project.rb
class Types::PreviousProjectTypeAttribute < GraphQL::Schema::Enum
  value "Project", "Represents a project on the advisable platform"
  value "OffPlatformProject", "Represents a project that occured off the advisable platform"
end