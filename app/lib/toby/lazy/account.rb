# frozen_string_literal: true

module Toby
  module Lazy
    class Account < Base
      def load_records(ids)
        ::Account.where(id: ids).each do |record|
          state[:loaded_ids][record.id] = record
        end
      end
    end
  end
end
