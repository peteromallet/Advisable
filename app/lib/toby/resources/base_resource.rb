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

        def query_name_destroy
          @query_name_destroy || "destroy#{model_s.camelize}"
        end

        def attribute(name, type, **args)
          @attributes ||= [Attributes::Id.new(:id)]
          @attributes << type.new(name, **args)
        end

        def type
          @type ||= define_type
        end

        def define_type
          root = self
          type_class = Class.new(GraphQL::Schema::Object) do
            graphql_name(root.model.name)
            root.attributes.each do |attribute|
              # define a field for each attribute
              field attribute.name, attribute.type, null: true
              # Forward all of the getters for each attribute to the attribute instance.
              define_method(attribute.name) do
                attribute.lazy_read(object, context) || attribute.read(object)
              end
            end
          end

          Toby::Types.const_set(name.demodulize, type_class)
        end

        def filter_type
          @filter_type ||= define_filter_type
        end

        def define_filter_type
          root = self
          Class.new(GraphQL::Schema::InputObject) do
            graphql_name("#{root.model.name}Filter")
            root.attributes.each do |attribute|
              next unless attribute.class.filter_type

              argument attribute.name, attribute.class.filter_type, required: false
            end
          end
        end

        def input_type
          @input_type ||= define_input_type
        end

        def define_input_type
          root = self
          Class.new(GraphQL::Schema::InputObject) do
            graphql_name("#{root.model.name}Attributes")
            root.attributes.each do |attribute|
              argument attribute.name, attribute.input_type, required: false
            end
          end
        end

        def update_mutation
          @update_mutation ||= define_update_mutation
        end

        def define_update_mutation
          root = self
          Class.new(Toby::Mutations::Update) do
            self.resource = root
            graphql_name "Update#{root.model.name}"
            argument :id, GraphQL::Schema::Object::ID, required: true
            argument :attributes, root.input_type, required: true
            field :resource, root.type, null: true
          end
        end
      end
    end
  end
end

#       def column(attribute, type, **args)
#         @columns ||= [Advisatable::Columns::Id.new(:id)]
#         @columns << type.new(attribute, **args)
#       end

#       def get_column(attribute)
#         @columns.find { |c| c.attribute == attribute }
#       end

#       def show_query_name
#         model.to_s.camelize(:lower)
#       end

#       def update_mutation_name
#         "update_#{model}".camelize(:lower)
#       end

#       def create_mutation_name
#         "create_#{model}".camelize(:lower)
#       end

#       def destroy_mutation_name
#         "destroy_#{model}".camelize(:lower)
#       end

#       def input_type
#         @input_type ||= define_input_type
#       end

#       def filter_type
#         @filter_type ||= define_filter_type
#       end

#       def update_mutation
#         @update_mutation ||= define_update_mutation
#       end

#       def create_mutation
#         @create_mutation ||= define_create_mutation
#       end

#       def show(id:)
#         model.find(id)
#       end

#       def define_input_type
#         root = self
#         Class.new(GraphQL::Schema::InputObject) do
#           graphql_name("#{root.model.name}Attributes")
#           root.columns.each do |column|
#             next if column.readonly

#             argument column.attribute, column.input_type, required: false
#           end
#         end
#       end

#       def define_filter_type
#         root = self
#         Class.new(GraphQL::Schema::InputObject) do
#           graphql_name("#{root.model.name}Filter")
#           root.columns.each do |column|
#             next if column.class.filter_type.blank?

#             argument column.attribute, column.class.filter_type, required: false
#           end
#         end
#       end

#       def define_update_mutation
#         root = self
#         Class.new(Advisatable::Mutations::Update) do
#           self.resource = root
#           graphql_name "Update#{root.model.name}"
#           argument :id, GraphQL::Schema::Object::ID, required: true
#           argument :attributes, root.input_type, required: true
#           field :resource, root.type, null: true
#         end
#       end

#       def define_create_mutation
#         root = self
#         Class.new(Advisatable::Mutations::Create) do
#           self.resource = root
#           graphql_name "Create#{root.model.name}"
#           argument :attributes, root.input_type, required: true
#           field :resource, root.type, null: true
#         end
#       end
#     end
#   end
# end
