class WebhookConfiguration < ApplicationRecord
  validates :url, presence: true
  validates :type, presence: true
  validates :name, presence: true
  validate :valid_criteria
  serialize :criteria, Array

  OPERATORS = [
    :equals,
    :dose_not_equal
  ]

  def self.model_name
    return super if self == WebhookConfiguration
    WebhookConfiguration.model_name
  end

  def process(entity)
    matched_criteria = criteria.select do |c|
      send(c["operator"], entity, c["attribute"], c["value"])
    end
    return unless matched_criteria.length == criteria.length
    webhook = Webhook.create(url: url, data: data(entity))
    WebhookJob.perform_later(webhook.id)
    webhook
  end

  def changes_to(entity, attribute, value)
    return false unless entity.send("saved_change_to_#{attribute}?")
    entity[attribute] =~ Regexp.new(value)
  end

  def equals(entity, attribute, value)
    entity[attribute] =~ Regexp.new(value)
  end

  def does_not_equal(entity, attribute, value)
    !(entity[attribute] =~ Regexp.new(value))
  end

  def data
    raise NotImplemented
  end

  private

  def valid_criteria
    errors.add(:criteria, "must be an array") unless criteria.is_a? Array
    errors.add(:criteria, "must have at least one criteria block") if criteria.length === 0
    criteria.each do |config|
      break errors.add(:criteria, "block must have an attribute") unless config["attribute"]
      break errors.add(:criteria, "block must have an operator") unless config["operator"]
      break errors.add(:criteria, "#{config["operator"]} is not a supported operator") unless config["operator"]
      break errors.add(:criteria, "block must have a value") unless config["value"]
    end
  end
end
