# frozen_string_literal: true

require 'administrate/field/base'

class FeaturesField < Administrate::Field::Base
  def to_s
    resource.class.feature_flags.map do |flag|
      toggled = resource.public_send("#{flag}?") ? "Yes" : "No"
      "#{flag}: #{toggled}"
    end.join(', ')
  end
end
