class Industry < ApplicationRecord
  include Uid
  validates :name, presence: true
  has_many :project_industries
  has_many :previous_projects,
           through: :project_industries,
           source: :project,
           source_type: 'PreviousProject'
  has_many :skills, -> { distinct }, through: :previous_projects

  before_validation :set_color, on: :create

  scope :active, -> { where(active: true) }

  COLORS = %w[neutral blue purple cyan green yellow orange red].freeze

  def set_color
    return if color.present?
    self.color = COLORS.sample
  end
end
