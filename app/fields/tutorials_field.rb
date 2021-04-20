# frozen_string_literal: true

require 'administrate/field/base'

class TutorialsField < Administrate::Field::Base
  def to_s
    data.join(', ')
  end

  def available_tutorials
    resource.specialist_or_user&.class&.tutorials
  end
end
