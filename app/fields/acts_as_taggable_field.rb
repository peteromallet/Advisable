# frozen_string_literal: true

require "administrate/field/base"

class ActsAsTaggableField < Administrate::Field::Base
  def to_s
    delimited
  end

  def delimited
    data.map(&:name)&.join(", ")
  end

  def name
    context = super
    count = Subscription.where(tag_id: data.pluck(:id)).distinct.count(:specialist_id)
    "#{context} (#{count})"
  end

  def attribute
    context = super.to_s.singularize
    "#{context}_list"
  end

  def self.permitted_attribute(attr, _options = nil)
    context = super.to_s.singularize
    {"#{context}_list" => []}
  end

  def tag_options
    return [] unless defined? ActsAsTaggableOn::Tag

    ActsAsTaggableOn::Tag.order(:name).map do |t|
      label = t.topicable_type ? "#{t.name} (#{t.topicable_type})" : t.name
      [label, t.name]
    end
  end
end
