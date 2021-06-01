# frozen_string_literal: true

module Toby
  module Types
    class Version < GraphQL::Schema::Object
      field :number, Int, null: false
      def number
        object["v"]
      end

      field :created_at, GraphQL::Types::ISO8601DateTime, null: false
      def created_at
        Time.zone.at(object["ts"] / 1000)
      end

      field :responsible, String, null: true # Can we pass account here?
      def responsible
        responsible_account = object.dig("m", "_r")
        return unless responsible_account

        ::Account.find(responsible_account).name
      end

      field :changes, [VersionChange], null: false
      def changes
        object["c"].to_a
      end
    end
  end
end
