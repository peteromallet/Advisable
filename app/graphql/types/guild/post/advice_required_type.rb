# frozen_string_literal: true

module Types
  module Guild
    module Post
      class AdviceRequiredType < Types::BaseType
        implements Types::Guild::PostInterface

        graphql_name "GuildPostAdviceRequired"
      end
    end
  end
end
