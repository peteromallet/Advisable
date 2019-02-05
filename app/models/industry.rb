class Industry < ApplicationRecord
  include UID
  validates :name, presence: true
end
