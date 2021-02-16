# frozen_string_literal: true

# rubocop:disable Style/ClassAndModuleChildren
class WebhookConfiguration::Interview < WebhookConfiguration
  def data(interview)
    {
      id: interview.uid,
      starts_at: interview.starts_at,
      status: interview.status,
      time_zone: interview.time_zone,
      application: {
        id: interview.application.uid
      }
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
