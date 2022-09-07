# frozen_string_literal: true

class AdminController < ApplicationController
  before_action :admin?
  before_action :profiling

  def finance
    finance_email = "Advisable Finance <finance@advisable.com>"
    GenerateFinanceCsvJob.perform_later(finance_email)
    redirect_to admin_dashboard_index_path, notice: "Finance report is being emailed to #{finance_email}"
  end

  private

  def profiling
    Rack::MiniProfiler.authorize_request if current_account&.developer?
  end
end
