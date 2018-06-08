class WebhookConfiguration < ApplicationRecord
  validates :url, presence: true
  validates :type, presence: true
  validates :name, presence: true
  validate :valid_criteria

  OPERATORS = [
    :equals,
    :dose_not_equal
  ]

  class << self
    attr_reader :webhook_attributes

    def webhook_attribute(attr, operators: OPERATORS)
      @webhook_attributes ||= {}
      @webhook_attributes[attr] = { operators: operators }
    end
  end

  def criteria
    self[:criteria] || []
  end

  def process(entity)
    matched_criteria = criteria.select do |c|
      send(c["operator"], entity.send(c["attribute"]), c["value"])
    end
    return unless matched_criteria.length == criteria.length
    puts "EMIT WEBHOOK"
  end

  def equals(data, value)
    data =~ Regexp.new(value)
  end

  def does_not_equal(data, value)
    !(data =~ Regexp.new(value))
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
      unless self.class.webhook_attributes.keys.include?(config["attribute"])
        errors.add(:criteria, "Webhooks can not be configured for #{config["attribute"]}")
      end
    end
  end
end
