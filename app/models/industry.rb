class Industry < ApplicationRecord
  include Uid
  validates :name, presence: true
  has_many :project_industries
  has_many :projects, through: :project_industries

  before_validation :set_color, on: :create

  scope :active, -> { where(active: true) }

  COLORS = %w[neutral blue purple cyan green yellow orange red].freeze

  def set_color
    return if color.present?
    self.color = COLORS.sample
  end
end
