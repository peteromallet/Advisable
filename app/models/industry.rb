class Industry < ApplicationRecord
  include Uid
  validates :name, presence: true
  has_many :project_industries
  has_many :projects, through: :project_industries
end
