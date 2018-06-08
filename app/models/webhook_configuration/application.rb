class WebhookConfiguration::Application < WebhookConfiguration
  def data(application)
    {
      project_id: application.project.airtable_id,
      application_id: application.airtable_id,
      specialist_id: application.specialist.airtable_id,
      reason: application.rejection_reason.try(:reason)
    }
  end
end
