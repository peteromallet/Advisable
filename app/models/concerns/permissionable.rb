# frozen_string_literal: true

module Permissionable
  extend ActiveSupport::Concern

  included do
    scope :with_permission, ->(permission) { where("permissions ? :permission", permission: permission) }
  end

  class_methods do
    def register_permissions(*permissions)
      permissions.map(&:to_s).each do |permission|
        define_method("#{permission}?") do
          self.permissions.include?(permission)
        end

        define_method("toggle_#{permission}") do
          self.permissions = if self.permissions.include?(permission)
                               self.permissions - [permission]
                             else
                               self.permissions + [permission]
                             end
        end

        define_method("toggle_#{permission}!") do
          public_send("toggle_#{permission}")
          save!
        end
      end
    end
  end
end
