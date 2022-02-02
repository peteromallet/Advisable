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

    def callable?(object)
      return true if @conditional.nil?

      @conditional.call(object)
    end

    def execute(object, context, responsible_id: nil)
      return unless callable?(object)

      Logidze.with_responsible(responsible_id) do
        resource.public_send(name, object, context)
      end
    end
  end
end
