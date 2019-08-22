class ApplicationReference < ApplicationRecord
  include Uid
  uid_prefix 'ref'

  belongs_to :application
  belongs_to :project, polymorphic: true
end
