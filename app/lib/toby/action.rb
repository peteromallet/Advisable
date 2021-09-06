# frozen_string_literal: true

module Toby
  class Action
    attr_reader :name, :resource, :label

    def initialize(name, resource, **args)
      @name = name
      @resource = resource
      @label = args[:label] || name
      if args[:if].presence
        @conditional = args[:if]
      elsif args[:unless].presence
        @conditional = ->(object) { !args[:unless].call(object) }
      end
    end

    def can_call?(object)
      return true if @conditional.nil?

      @conditional.call(object)
    end
  end
end
