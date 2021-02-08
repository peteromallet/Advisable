# frozen_string_literal: true

module Types
  module Guild
    module Post
      class AdviceRequiredType < Types::BaseType
        implements Types::Guild::PostInterface

        graphql_name "GuildPostAdviceRequired"

        field :need_help, Boolean, null: true, deprecation_reason: "needHelp is no longer needed"

        def need_help
          object.data["need_help"]
        end
      end
    end
  end
end
