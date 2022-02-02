# frozen_string_literal: true

require "rails_helper"

module TobyHelpers
  def described_class_action(name)
    described_class.actions.find { |a| a.name == name }
  end

  def execute_action(action, object, context = nil)
    described_class.public_send(action.name, object, context)
  end
end

RSpec.configure do |c|
  c.include(TobyHelpers)
end
