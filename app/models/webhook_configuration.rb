# DEPRECATED
# Webhook configurations have been deprecated and you should add a new
# WebhookEvent instead.
class WebhookConfiguration < ApplicationRecord
  validates :url, presence: true
  validates :type, presence: true
  validates :name, presence: true
  validate :valid_criteria
  serialize :criteria, Array

  OPERATORS = [
    "changes_to"
  ]

  # This is a hack to prevent rails path generators from loading for single
  # table inheritance. i.e allways use webhook_configuration_path
  def self.model_name
    return super if self == WebhookConfiguration
    WebhookConfiguration.model_name
  end

  # process a given entity and emit a webhook if it mactches the criteria.
  def process(entity)
    matched_criteria = criteria.select do |c|
      c.symbolize_keys
      send(c[:operator], entity, c[:attribute], c[:value])
    end
    return unless matched_criteria.length == criteria.length
    webhook = Webhook.create(url: url, data: data(entity))
    webhook
  end

  def data(entity)
    raise NotImplementedError
  end

  private

  # operator method to check if an entities attribute has changed to a given
  # value.
  def changes_to(entity, attribute, value)
    return false unless entity.send("saved_change_to_#{attribute}?")
    entity[attribute] =~ Regexp.new(value)
  end

  private

  def valid_criteria
    errors.add(:criteria, "must have at least one criteria") if criteria.length === 0
    criteria.each do |config|
      config.symbolize_keys
      break errors.add(:criteria, "block must have an attribute") unless config[:attribute]
      break errors.add(:criteria, "block must have an operator") unless config[:operator]
      break errors.add(:criteria, "#{config[:operator]} is not a supported operator") unless OPERATORS.include?(config[:operator])
      break errors.add(:criteria, "block must have a value") unless config[:value]
    end
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
