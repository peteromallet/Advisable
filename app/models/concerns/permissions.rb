module Permissions
  extend ActiveSupport::Concern

  SCOPES = [
    "projects:all"
  ]

  included do
    validate :valid_permissions

    def has_permission?(permission)
      permissions.include?(permission)
    end

    private

    def valid_permissions
      permissions.each do |p|
        next if SCOPES.include?(p)
        errors.add(:permissions, "#{p} is not a valid permission")
      end
    end
  end
end