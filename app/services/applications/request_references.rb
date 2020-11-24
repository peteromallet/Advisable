class Applications::RequestReferences < ApplicationService
  attr_reader :application, :current_account_id

  def initialize(application:, current_account_id: nil)
    @application = application
    @current_account_id = current_account_id
  end

  def call
    application.references_requested = true
    success = Logidze.with_responsible(current_account_id) do
      application.save
    end
    if success
      application.sync_to_airtable
    end
    application
  end
end
