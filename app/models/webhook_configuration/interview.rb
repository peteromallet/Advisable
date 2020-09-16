class WebhookConfiguration::Interview < WebhookConfiguration
  def data(interview)
    {
      id: interview.id,
      airtable_id: interview.airtable_id,
      starts_at: interview.starts_at,
      status: interview.status,
      time_zone: interview.time_zone,
      application: {
        id: interview.application.id,
        airtable_id: interview.application.airtable_id
      },
    }
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
