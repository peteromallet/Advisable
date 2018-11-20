class WebhookConfiguration::Project < WebhookConfiguration
  def data(project)
    project.attributes.except("client_id", "created_at", "updated_at")
  end
end
