# frozen_string_literal: true

# rubocop:disable Style/ClassAndModuleChildren
class WebhookConfiguration::Application < WebhookConfiguration
  def data(application)
    {
      project_id: application.project.airtable_id,
      application_id: application.airtable_id, # TODO: What about this?
      specialist_id: application.specialist.airtable_id,
      reason: application.rejection_reason.try(:reason)
    }
  end
end

# rubocop:enable Style/ClassAndModuleChildren

# == Schema Information
#
# Table name: webhook_configurations
#
#  id         :bigint           not null, primary key
#  criteria   :jsonb
#  name       :string
#  type       :string
#  url        :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
