require "administrate/field/base"

class LabelledSelectField < Administrate::Field::Base
  def collection
    values = options.fetch(:collection, {})
  end

  def selectable_options
    collection.map do |option|
      [option.last, option.first]
    end
  end

  def to_s
    collection.key(data)
  end
end
