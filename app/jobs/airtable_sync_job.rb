# frozen_string_literal: true

class AirtableSyncJob < ApplicationJob
  queue_as :critical

  def perform(klass, additional_fields = {})
    klass.sync_to_airtable(additional_fields)
  end
end
