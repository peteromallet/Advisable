# frozen_string_literal: true

require "rails_helper"

module TobyHelpers
  def described_class_action(name)
    described_class.actions.find { |a| a.name == name }
  end

  def execute_action(action, object, context = nil)
    action.execute(object, context)
  end
end

RSpec.configure do |c|
  c.include(TobyHelpers)
end
