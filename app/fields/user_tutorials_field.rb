require 'administrate/field/base'

class UserTutorialsField < Administrate::Field::Base
  def to_s
    data.join(', ')
  end
end
