class Webhook < ApplicationRecord
  serialize :response, Hash
  after_initialize :set_pending, if: :new_record?

  def self.process(entity)
    configs = WebhookConfiguration.where(type: "WebhookConfiguration::#{entity.class.to_s}")
    configs.map { |c| c.process(entity) }.compact
  end

  private

  def set_pending
    self.status = "pending"
  end
end
