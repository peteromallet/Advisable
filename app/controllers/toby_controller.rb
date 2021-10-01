# frozen_string_literal: true

class TobyController < ApplicationController
  include CurrentUser
  before_action :admin?

  def index
    prefetch_toby_query("app/javascript/toby/components/resources/resources.graphql", cache_key: "toby_resources_#{current_account.id}")
    prefetch_toby_query("app/javascript/toby/components/schema/introspection.graphql", cache_key: "toby_introspection")
  end

  private

  def prefetch_toby_query(path, cache_key: nil)
    prefetch_query(
      path,
      schema: Toby::Schema,
      context: {session_manager: session_manager},
      cache_key: cache_key
    )
  end

  def admin?
    return if current_account&.admin?

    redirect_to(current_account ? "/" : "/login?redirect=/toby")
  end
end
