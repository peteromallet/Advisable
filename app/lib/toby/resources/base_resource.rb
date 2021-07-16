# frozen_string_literal: true

module Toby
  module Resources
    class BaseResource
      class << self
        attr_reader :model, :model_s, :attributes, :actions

        def model_name(klass)
          @model = klass
          @model_s = model.to_s.tr("::", "")
          @attributes = [Attributes::Id.new(:id, self, readonly: true)]
          @actions = []
        end

        def query_name_collection
          model_s.pluralize.camelize(:lower)
        end

        def query_name_item
          model_s.camelize(:lower)
        end

        # query_name_create query_name_update query_name_delete query_name_search
        %i[create update delete search].each do |method|
          define_method("query_name_#{method}") do
            "#{method}#{model_s.camelize}"
          end
        end

        def attribute(name, type, **args)
          args[:parent] = self.name.demodulize unless args.key?(:parent)
          @attributes << type.new(name, self, **args)
        end

        def action(name, **args)
          @actions << Toby::Action.new(name, self, **args)
        end

        def label(record, _context)
          record.id
        end

        def search(input)
          model.where(id: input)
        end

        def type
          @type ||= Toby::Types.const_set(name.demodulize, type_class)
        end

        def type_class
          root = self
          Class.new(GraphQL::Schema::Object) do
            graphql_name(root.model_s)

            field :_label, String, null: false
            define_method(:_label) do
              root.label(object, context)
            end

            field :_history, [Toby::Types::Version], null: true
            define_method(:_history) do
              return [] unless root.model.ancestors.include?(Logidze::Model)

              object.reload_log_data.data["h"]
            end

            root.attributes.each do |attribute|
              field attribute.name, attribute.type, null: true
              define_method(attribute.name) do
                if attribute.respond_to?(:lazy_read_class)
                  attribute.lazy_read_class.new(attribute, context, object)
                else
                  attribute.read(object)
                end
              end
            end
          end
        end

        def input_type
          @input_type ||= define_input_type
        end

        def define_input_type
          root = self
          Class.new(GraphQL::Schema::InputObject) do
            graphql_name("#{root.model_s}Attributes")
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
            graphql_name "Update#{root.model_s}"
            argument :id, GraphQL::Schema::Object::ID, required: true
            argument :attributes, root.input_type, required: true
            field :resource, root.type, null: true
          end
        end

        def create_mutation
          root = self
          Class.new(Toby::Mutations::Create) do
            self.resource = root
            graphql_name "Create#{root.model_s}"
            argument :attributes, root.input_type, required: true
            field :resource, root.type, null: true
          end
        end

        def delete_mutation
          root = self
          Class.new(Toby::Mutations::Delete) do
            self.resource = root
            graphql_name "Delete#{root.model_s}"
            argument :id, GraphQL::Schema::Object::ID, required: true
            field :success, GraphQL::Types::Boolean, null: true
          end
        end

        def action_mutation
          root = self
          Class.new(Toby::Mutations::Action) do
            self.resource = root
            graphql_name "#{root.model_s}Action"
            argument :id, GraphQL::Schema::Object::ID, required: true
            argument :name, String, required: true
            field :resource, root.type, null: true
          end
        end
      end
    end
  end
end
