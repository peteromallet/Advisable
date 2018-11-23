require "administrate/field/base"

class TextArrayField < Administrate::Field::Base
  def to_s
    data
  end
end
