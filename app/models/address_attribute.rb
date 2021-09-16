# frozen_string_literal: true

# Uses the rails attributes API to handle address data.
class AddressAttribute
  KEYS = %i[line1 line2 city state country postcode].freeze
  KEYS.map { |key| attr_accessor key }

  def initialize(attributes = {})
    attributes.symbolize_keys!
    KEYS.map { |key| public_send("#{key}=", attributes[key]) }
  end

  def as_json(_options = {})
    KEYS.index_with { |key| public_send(key) }
  end

  def inline
    KEYS.filter_map { |key| public_send(key) }.join("\n")
  end

  def comma_separated
    KEYS.filter_map { |key| public_send(key) }.join(", ")
  end

  def ==(other)
    as_json == other.as_json
  end

  def [](key)
    as_json[key.to_sym]
  end

  def provided?
    city.present? && country.present?
  end

  class Type < ActiveRecord::Type::Value
    def type
      :jsonb
    end

    def cast(value)
      hash = value.instance_of?(Hash) ? value : {}

      if value.instance_of?(String)
        decoded =
          begin
            ::ActiveSupport::JSON.decode(value)
          rescue StandardError
            nil
          end
        hash = decoded unless decoded.nil?
      end

      AddressAttribute.new(hash)
    end

    def changed_in_place?(raw_old_value, new_value)
      cast(raw_old_value) != new_value
    end

    def serialize(value)
      case value
      when Hash, AddressAttribute
        ::ActiveSupport::JSON.encode(value)
      else
        super
      end
    end
  end
end
