module Advisatable
  class Resource
    class << self
      attr_reader :model, :columns

      def set_model(klass)
        @model = klass
      end

      def column(attribute, type, **args)
        @columns ||= [Advisatable::Columns::Id.new(:id)]
        @columns << type.new(attribute, **args)
      end

      def get_column(attribute)
        @columns.find { |c| c.attribute == attribute }
      end

      def type
        @type ||= define_type
      end

      def index_query_name
        model.to_s.pluralize.camelize(:lower)
      end

      def show_query_name
        model.to_s.camelize(:lower)
      end

      def update_mutation_name
        "update_#{model}".camelize(:lower)
      end

      def create_mutation_name
        "create_#{model}".camelize(:lower)
      end

      def destroy_mutation_name
        "destroy_#{model}".camelize(:lower)
      end

      def input_type
        @input_type ||= define_input_type
      end

      def filter_type
        @filter_type ||= define_filter_type
      end

      def update_mutation
        @update_mutation ||= define_update_mutation
      end

      def create_mutation
        @create_mutation ||= define_create_mutation
      end

      def index(filter: {})
        records = model.all
        columns.each do |column|
          records = column.filter(records, filter[column.field]) if filter[column.field]
        end
        records
      end

      def show(id:)
        model.find(id)
      end

      private

      def define_type
        root = self
        Class.new(GraphQL::Schema::Object) do
          graphql_name(root.model.name)
          field :id, GraphQL::Schema::Object::ID, null: false
          root.columns.each do |column|
            # define a field for each column
            field column.attribute, column.type, null: true
            # Forward all of the getters for each attribute to the column
            # instance.
            define_method column.attribute do
              column.read(object)
            end
          end
        end
      end

      def define_input_type
        root = self
        Class.new(GraphQL::Schema::InputObject) do
          graphql_name("#{root.model.name}Attributes")
          root.columns.each do |column|
            next if column.readonly
            argument column.attribute, column.input_type, required: false
          end
        end
      end

      def define_filter_type
        root = self
        Class.new(GraphQL::Schema::InputObject) do
          graphql_name("#{root.model.name}Filter")
          root.columns.each do |column|
            next if column.class.filter_type.blank?
            argument column.attribute, column.class.filter_type, required: false
          end
        end
      end

      def define_update_mutation
        root = self
        Class.new(Advisatable::Mutations::Update) do
          self.resource = root
          graphql_name "Update#{root.model.name}"
          argument :id, GraphQL::Schema::Object::ID, required: true
          argument :attributes, root.input_type, required: true
          field :resource, root.type, null: true
        end
      end

      def define_create_mutation
        root = self
        Class.new(Advisatable::Mutations::Create) do
          self.resource = root
          graphql_name "Create#{root.model.name}"
          argument :attributes, root.input_type, required: true
          field :resource, root.type, null: true
        end
      end
    end
  end
end
