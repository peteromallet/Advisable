# Statuses in airtable are stored in title case. We have built up a lot of
# dependency on these statuses throughout the codebase, however, we want to
# move towards normalizing them. This module is very similar to rails enum
# functionality except it does not include any validation or create additional
# scopes. It simply maps statuses from a symbol to the string they are stored
# in.
#
# class User < ApplicationRecord
#   include StatusMap
#
#   map_status :application_status, {
#     requested_access: 'Requested Access',
#   }
# end
#
# We can now use ':requested_access' to set the value. It will still store the
# value in the database as 'Requested Access' but will return the symbol when
# reading the value.
# user.update application_status: :requested_access
# user.application_status
# => :requested_access
#
# If no map is defined for a status it will simply set and get the value as
# normal.
module StatusMap
  extend ActiveSupport::Concern

  included do
    def self.map_status(status_map)
      status_map.each do |name, value|
        define_method(name) do
          actual = self[name]
          mapped = value.key(actual)
          mapped || actual
        end

        define_method("#{name}=") do |new_value|
          mapped = value[new_value]
          write_attribute(name, mapped || new_value)
        end
      end
    end
  end
end
