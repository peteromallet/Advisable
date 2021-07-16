# frozen_string_literal: true

module Toby
  class Action
    attr_reader :name, :resource, :label

    def initialize(name, resource, **args)
      @name = name
      @resource = resource
      @label = args[:label] || name
    end
  end
end
