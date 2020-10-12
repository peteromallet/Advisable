module GraphqlPrefetchHelper
  # Prefetches a graphql query so that apollo does not have to make additional
  # requests after the page loads.
  def prefetch_query(path, variables = {})
    query = Rails.cache.fetch(path) do
      GraphqlFileParser.import(path)
    end
    result = AdvisableSchema.execute(query, variables: variables, context: {current_user: current_user})
    tag :div, data: {prefetched_query: result.query.query_string.delete("\n"), result: result.as_json}
  end
end
