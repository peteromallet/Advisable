# Uses the rails attributes API to handle address data.
class AddressAttribute
  KEYS = %i[line1 line2 city state country postcode]
  KEYS.map { |key| attr_accessor key }

  def initialize(attributes = {})
    attributes.symbolize_keys!
    KEYS.map { |key| self.send("#{key}=", attributes[key]) }
  end

  def as_json(options = {})
    KEYS.inject({}) do |address, key|
      address[key] = send(key)
      address
    end
  end

  def ==(other)
    as_json == other.as_json
  end

  def [](key)
    as_json[key.to_sym]
  end

  class Type < ActiveRecord::Type::Value
    def type
      :jsonb
    end

    def cast(value)
      hash = value.class == Hash ? value : {}

      if value.class == String
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
