# frozen_string_literal: true

class TobyController < ApplicationController
  before_action :admin?

  def index
    prefetch_query("schema/introspection.graphql")
    prefetch_query("resources/resources.graphql", per_account: true)
  end

  private

  def prefetch_query(path, per_account: false)
    @prefetched_queries ||= []

    query = GraphqlFileParser.import("app/javascript/toby/components/#{path}")
    cache_key = "#{path}_#{ENV["HEROKU_RELEASE_VERSION"]}"
    cache_key = "#{cache_key}_#{current_account.id}" if per_account

    result = Rails.cache.fetch(cache_key) do
      Toby::Schema.execute(query, context: {session_manager: session_manager}).to_h
    end

    @prefetched_queries << {query: query, result: result}
  end

  def admin?
    return if current_account&.admin?

    redirect_to(current_account ? "/" : "/login?redirect=/toby")
  end
end
