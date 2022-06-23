# frozen_string_literal: true

module Toby
  module Attributes
    class Attachments < BaseAttribute
      include ActionView::Helpers::NumberHelper

      def type
        [GraphQL::Types::JSON]
      end

      def input_type
        [GraphQL::Types::String]
      end

      def readonly
        true
      end

      def read(object)
        object.public_send(name).map do |attachment|
          {
            id: attachment.id,
            size: number_to_human_size(attachment.blob.byte_size),
            filename: attachment.filename
          }
        end
      end
    end
  end
end
