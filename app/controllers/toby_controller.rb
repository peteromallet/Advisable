# frozen_string_literal: true

class TobyController < ApplicationController
  include CurrentUser
  before_action :admin?

  def index
    prefetch_toby_query("app/javascript/toby/components/resources/resources.graphql")
    prefetch_toby_query("app/javascript/toby/components/schema/introspection.graphql")
  end

  private

  def prefetch_toby_query(path)
    prefetch_query(
      path,
      schema: Toby::Schema,
      context: {session_manager: session_manager}
    )
  end

  def admin?
    return if current_account&.admin?

    redirect_to(current_account ? "/" : "/login?redirect=/toby")
  end
end
