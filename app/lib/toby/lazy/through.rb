# frozen_string_literal: true

module Toby
  module Lazy
    class Through < Base
      private

      # There has to be a better way to do this
      def polymorphic_constraint
        return unless reflection.through_reflection.type

        {reflection.through_reflection.type => reflection.through_reflection.inverse_of.source_reflection.class_name}
      end

      def load_records
        mapping = reflection.source_reflection.active_record.where(reflection.through_reflection.foreign_key => state[:pending])
        mapping = mapping.where(polymorphic_constraint) if polymorphic_constraint
        mapping = mapping.pluck(reflection.foreign_key, reflection.through_reflection.foreign_key).group_by(&:shift).transform_values(&:flatten)

        reflection.klass.where(reflection.association_primary_key => mapping.keys).each do |record|
          mapping[record.public_send(reflection.association_primary_key)].each do |r|
            state[:loaded][r] ||= []
            state[:loaded][r] << record
          end
        end
        state[:pending].clear
      end
    end
  end
end
