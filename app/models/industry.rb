class Industry < ApplicationRecord
  include Uid
  validates :name, presence: true
end
