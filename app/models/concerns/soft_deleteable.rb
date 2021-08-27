# frozen_string_literal: true

# Adds useful methods for feature flags support via JSONB.
# You need to add `features` JSONB column in the model via a migration.
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
