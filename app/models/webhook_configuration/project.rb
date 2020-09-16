class WebhookConfiguration::Project < WebhookConfiguration
  def data(project)
    project.attributes.except("client_id", "created_at", "updated_at")
  end
end

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
