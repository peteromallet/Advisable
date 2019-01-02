class Client < ApplicationRecord
  has_many :projects
  has_many :applications, through: :projects
  has_many :interviews, through: :applications

  validates :name, presence: true
end
