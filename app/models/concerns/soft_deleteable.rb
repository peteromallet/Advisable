# frozen_string_literal: true

# Adds soft delete functionality to ActiveRecord models.
# You need to add `deleted_at` datetime column in the model via a migration.
module SoftDeleteable
  extend ActiveSupport::Concern

  included do
    scope :active, -> { where(deleted_at: nil) }
    scope :deleted, -> { where.not(deleted_at: nil) }
  end

  def soft_delete!
    update!(deleted_at: Time.current)
  end

  def restore!
    update!(deleted_at: nil)
  end
end
