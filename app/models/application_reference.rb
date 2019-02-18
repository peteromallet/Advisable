class ApplicationReference < ApplicationRecord
  include UID
  uid_prefix 'ref'

  belongs_to :application
  belongs_to :project, polymorphic: true
end
