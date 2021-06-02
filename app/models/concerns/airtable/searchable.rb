# frozen_string_literal: true

module Airtable
  module Searchable
    extend ActiveSupport::Concern

    class_methods do
      def find_by_uid_or_airtable_id(id)
        airtable_id?(id) ? deprecated_find_by_airtable_id(id) : find_by(uid: id)
      end

      def deprecated_find_by_airtable_id(id)
        Sentry.capture_message("#find_by called with an Airtable ID", level: "debug")
        find_by(airtable_id: id)
      end

      def find_by_uid_or_airtable_id!(id)
        find_by_uid_or_airtable_id(id) || raise(ActiveRecord::RecordNotFound)
      end

      private

      def airtable_id?(id)
        id =~ /^rec[^_]/
      end
    end
  end
end
