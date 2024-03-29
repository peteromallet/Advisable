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

        def display_name
          model_s.gsub("::", "").tableize.humanize
        end

        def query_name_collection
          model_s.pluralize.camelize(:lower)
        end

        def query_name_item
          model_s.camelize(:lower)
        end

        # query_name_create query_name_update query_name_delete query_name_search query_name_action
        %i[create update delete search action].each do |method|
          define_method("query_name_#{method}") do
            "#{method}#{model_s.camelize}"
          end
        end

        def save(record, params)
          params.each do |key, value|
            attribute = attributes.find { |attr| attr.name == key }
            attribute.write(record, value) unless attribute.readonly
          end
          record.save!
          record.bg_sync_to_airtable if record.respond_to?(:sync_to_airtable) && record.airtable_id.present?
        end

        def attribute(name, type, **args)
          args[:parent] = self.name.sub(/^Toby::Resources::/, "").delete("::") unless args.key?(:parent)
          @attributes << type.new(name, self, **args)
        end

        def action(name, **args)
          @actions << Toby::Action.new(name, self, **args)
        end

        def label(record, _context)
          record.respond_to?(:uid) ? record.uid : record.id
        end

        def search(input)
          model.where(id: input)
        end

        def type
          @type ||= Toby::Types.const_set(name.sub(/^Toby::Resources::/, "").delete("::"), type_class)
        end

        def type_class
          root = self
          Class.new(GraphQL::Schema::Object) do
            graphql_name(root.model_s)

            field :_label, String, null: false
            define_method(:_label) do
              root.label(object, context)
            end

            field :_history, [Toby::Types::Version], null: false
            define_method(:_history) do
              return [] unless root.model.ancestors.include?(Logidze::Model)

              data = object.reload_log_data&.data&.dig("h")
              return [] unless data

              data.each do |version|
                version["c"].each do |key, value|
                  version["c"][key] = value.nil? ? "-" : value
                end
              end

              data
            end

            field :_actions, [Toby::Types::Action], null: false
            define_method(:_actions) do
              root.actions.filter_map do |action|
                action.callable?(object) ? action : nil
              end
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
            graphql_name "Action#{root.model_s.camelize}"
            argument :id, GraphQL::Schema::Object::ID, required: true
            argument :name, String, required: true
            field :resource, root.type, null: true
            field :url, String, null: true
            field :replace, String, null: true
            field :error, String, null: true
          end
        end
      end
    end
  end
end
