# frozen_string_literal: true

module Toby
  class Action
    attr_reader :name, :resource

    def initialize(name, resource)
      @name = name
      @resource = resource
    end
  end
end
