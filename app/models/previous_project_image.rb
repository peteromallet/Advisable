class PreviousProjectImage < ApplicationRecord
  include Uid
  uid_prefix 'ppi'

  belongs_to :previous_project,
             class_name: 'PreviousProject',
             foreign_key: 'off_platform_project_id'
  has_one_attached :image

  before_save :toggle_cover, if: :cover
  after_destroy :set_first_to_cover, if: :cover
  after_destroy :reduce_positions

  private

  # Set any existing cover photo to false
  def toggle_cover
    unless previous_project.cover_photo && previous_project.cover_photo != self
      return
    end
    previous_project.images.where(cover: true).where.not(id: id).update(
      cover: false
    )
  end

  def reduce_positions
    previous_project.images.where('position > ?', position).each do |ppi|
      ppi.update position: ppi.position - 1
    end
  end

  def set_first_to_cover
    previous_project.images.order(position: :asc).first.try(
      :update,
      cover: true
    )
  end
end
