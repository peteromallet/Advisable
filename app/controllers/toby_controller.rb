# frozen_string_literal: true

class TobyController < ApplicationController
  layout "toby"
  skip_before_action :prefetch_viewer
  before_action :admin?

  def index
    prefetch_query("TobyProvider/tobyQuery.graphql", per_account: true)
  end

  def download
    attachment = ActiveStorage::Attachment.find(params[:id])
    redirect_to(attachment.url, allow_other_host: true)
  end

  private

  def prefetch_query(path, per_account: false)
    @prefetched_queries ||= []

    query = GraphqlFileParser.import("app/javascript/toby/components/#{path}")
    cache_key = "#{path}_#{ENV.fetch("HEROKU_RELEASE_VERSION", nil)}"
    cache_key = "#{cache_key}_#{current_account.id}" if per_account

    result = Rails.cache.fetch(cache_key) do
      Toby::Schema.execute(query, context: {session_manager:}).to_h
    end

    @prefetched_queries << {query:, result:}
  end
end
