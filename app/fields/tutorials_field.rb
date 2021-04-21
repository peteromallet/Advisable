# frozen_string_literal: true

require 'administrate/field/base'

class TutorialsField < Administrate::Field::Base
  def to_s
    data.join(', ')
  end

  delegate :available_tutorials, to: :resource
end
