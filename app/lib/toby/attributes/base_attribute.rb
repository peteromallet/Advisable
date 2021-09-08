# frozen_string_literal: true

module Toby
  module Attributes
    class BaseAttribute
      attr_reader :name, :resource, :options

      def initialize(name, resource, **options)
        @name = name
        @resource = resource
        @options = options
      end

      def type
        raise "Type not defined"
      end

      def input_type
        raise "Input type not defined"
      end

      def humanized_name
        name.to_s.humanize
      end

      def reflection
        resource.model.reflect_on_association(name)
      end

      def field
        name.to_s.camelize(:lower)
      end

      def parent
        options[:parent]
      end

      def readonly
        options.fetch(:readonly, false)
      end

      def sortable
        options.fetch(:sortable, true)
      end

      def case_insensitive_compare?
        options.fetch(:case_insensitive_compare, false)
      end

      def read(resource)
        resource.public_send(name)
      end

      def write(resource, value)
        resource.public_send("#{name}=", value)
      end

      def filter(records, _filters)
        records
      end

      class << self
        def filter(name, type, **args, &block)
          @filters ||= []
          @filters << type.new(name, self, **args, &block)
        end

        def filters
          @filters || {}
        end

        def extension_field(name, type)
          @extension_fields ||= {}
          @extension_fields[name] = type
        end

        def extension_fields
          @extension_fields || []
        end

        def lookup?
          false
        end

        def attribute_type
          # We don't want to define additional attribute types for lookup
          # classes. For now we just define a lookup method in the lookup class
          # to indicate that graphql should use the superclass type.
          return superclass.attribute_type if lookup?

          @attribute_type ||= begin
            root = self
            Class.new(GraphQL::Schema::Object) do
              graphql_name("#{root.name.split('::').last}Attribute")
              implements(Types::AttributeInterface)

              root.extension_fields.each do |name, type|
                field name, type, null: true

                define_method name do
                  object.instance_variable_get("@options")[name]
                end
              end
            end
          end
        end
      end
    end
  end
end
