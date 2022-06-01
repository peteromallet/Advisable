# frozen_string_literal: true

module Toby
  module Lookups
    module Interviews
      class Agreement < Attributes::String
        INTERVIEW_PARTICIPANTS_JOIN = <<~SQL
          LEFT JOIN users ON interview_participants.account_id = users.account_id
          LEFT JOIN specialists ON interview_participants.account_id = specialists.account_id
        SQL

        include Lookup

        filter "is blank", Filters::CheckNil do |records, _attribute, _value|
          ids = interviews_with_agreements(records.pluck(:id)).select { |_, agreement| agreement.nil? }.map(&:first)
          records.where(id: ids)
        end

        filter "is not blank", Filters::CheckNotNil do |records, _attribute, _value|
          ids = interviews_with_agreements(records.pluck(:id)).reject { |_, agreement| agreement.nil? }.map(&:first) # rubocop:disable Style/CollectionCompact
          records.where(id: ids)
        end

        def lazy_read_class
          Toby::Lazy::Single
        end

        def via
          :id
        end

        def load_records(pending)
          self.class.interviews_with_agreements(pending)
        end

        def self.interviews_with_agreements(ids)
          participants = InterviewParticipant.where(interview_id: ids).joins(INTERVIEW_PARTICIPANTS_JOIN).pluck("interview_id", "specialists.id", "users.id")
          participants.group_by(&:first).filter_map do |interview_id, group|
            agreement = nil
            if group.size == 2
              specialist_id = group.filter_map { |g| g[1] }.first
              user_id = group.filter_map { |g| g[2] }.first
              agreement = ::Agreement.find_by(user_id:, specialist_id:).uid unless specialist_id.nil? || user_id.nil?
            end

            [interview_id, agreement]
          end
        end
      end
    end
  end
end
