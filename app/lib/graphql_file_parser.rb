# frozen_string_literal: true

# We use the graphql-tag package webpack loader on the frontend to parse
# .graphql files. This loader supports syntax for importing other graphql
# files inside a graphql file. This class will take a path to a graphql file
# and return the full query, including any imported fragments. It will also
# add the __typename field to any nodes, Apollo does this on the frontend and is
# needed for caching.
class GraphqlFileParser
  IMPORT_REGEX = /^\#import\s"(.*)"/

  class AddTypename < GraphQL::Language::Visitor
    def on_field(node, parent)
      has_selections = node.selections.any?
      selections = node.selections.map { |s| s.try(:name) }

      if has_selections && selections.exclude?("__typename")
        typename_node = GraphQL::Language::Nodes::Field.new(name: "__typename")
        node = node.merge(selections: node.selections + [typename_node])
      end

      super(node, parent)
    end
  end

  def self.import(path)
    query = File.read(path)

    query.gsub!(IMPORT_REGEX) do |import_statement|
      import_path = import_statement[IMPORT_REGEX, 1]
      import(File.join(File.dirname(path), import_path))
    end

    parsed = GraphQL.parse(query)
    parsed = AddTypename.new(parsed).visit
    parsed.to_query_string.strip.delete("\n").gsub(/\s+/, " ")
  end
end
