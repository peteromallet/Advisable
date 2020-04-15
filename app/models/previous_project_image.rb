class PreviousProjectImage < ApplicationRecord
  include Uid
  uid_prefix 'ppi'

  belongs_to :previous_project,
             class_name: 'PreviousProject',
             foreign_key: 'off_platform_project_id'
  has_one_attached :image

  before_save :toggle_cover, if: :cover

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
end
