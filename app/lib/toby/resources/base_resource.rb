# frozen_string_literal: true

module Toby
  module Resources
    class BaseResource
      class << self
        attr_reader :model, :model_s, :attributes

        def model_name(klass)
          @model = klass
          @model_s = model.to_s
        end

        def query_names(**options)
          options.each do |key, value|
            instance_variable_set(:"@query_name_#{key}", value)
          end
        end

        def query_name_collection
          @query_name_collection || model_s.pluralize.camelize(:lower)
        end

        def query_name_item
          @query_name_item || model_s.camelize(:lower)
        end

        def query_name_create
          @query_name_create || "create#{model_s.camelize}"
        end

        def query_name_update
          @query_name_update || "update#{model_s.camelize}"
        end

        def query_name_delete
          @query_name_delete || "delete#{model_s.camelize}"
        end

        def query_name_search
          @query_name_search || "search#{model_s.camelize}"
        end

        def attribute(name, type, **args)
          @attributes ||= [Attributes::Id.new(:id, self)]

          args[:parent] = self.name.demodulize unless args.key?(:parent)
          @attributes << type.new(name, self, **args)
        end

        def type
          @type ||= define_type
        end

        def define_type
          root = self
          type_class = Class.new(GraphQL::Schema::Object) do
            graphql_name(root.model.name)
            field :_label, String, null: false

            define_method(:_label) do
              root.label(object)
            end

            root.attributes.each do |attribute|
              # define a field for each attribute
              field attribute.name, attribute.type, null: true
              # Forward all of the getters for each attribute to the attribute instance.
              define_method(attribute.name) do
                if attribute.respond_to?(:lazy_read_class)
                  attribute.lazy_read_class.new(attribute, context, object)
                else
                  attribute.read(object)
                end
              end
            end
          end

          Toby::Types.const_set(name.demodulize, type_class)
        end

        def input_type
          @input_type ||= define_input_type
        end

        def define_input_type
          root = self
          Class.new(GraphQL::Schema::InputObject) do
            graphql_name("#{root.model.name}Attributes")
            root.attributes.each do |attribute|
              next if attribute.readonly

              argument attribute.name, attribute.input_type, required: false
            end
          end
        end

        def update_mutation
          root = self
          Class.new(Toby::Mutations::Update) do
            self.resource = root
            graphql_name "Update#{root.model.name}"
            argument :id, GraphQL::Schema::Object::ID, required: true
            argument :attributes, root.input_type, required: true
            field :resource, root.type, null: true
          end
        end

        def create_mutation
          root = self
          Class.new(Toby::Mutations::Create) do
            self.resource = root
            graphql_name "Create#{root.model.name}"
            argument :attributes, root.input_type, required: true
            field :resource, root.type, null: true
          end
        end

        def delete_mutation
          root = self
          Class.new(Toby::Mutations::Delete) do
            self.resource = root
            graphql_name "Delete#{root.model.name}"
            argument :id, GraphQL::Schema::Object::ID, required: true
            field :success, GraphQL::Types::Boolean, null: true
          end
        end

        def label(record)
          record.id
        end

        def search(input)
          model.where(id: input)
        end
      end
    end
  end
end
