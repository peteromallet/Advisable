# frozen_string_literal: true

ActsAsTaggableOn::Tag.class_eval do
  extend FriendlyId
  friendly_id :name,
              use: :slugged
end
