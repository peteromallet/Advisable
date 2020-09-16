class PreviousProjectImage < ApplicationRecord
  include Uid
  uid_prefix 'ppi'

  belongs_to :previous_project,
             class_name: 'PreviousProject',
             foreign_key: 'off_platform_project_id'
  has_one_attached :image

  after_destroy :set_first_to_cover, if: :cover
  after_destroy :reduce_positions

  private

  def reduce_positions
    previous_project.images.where('position > ?', position).find_each do |ppi|
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

# == Schema Information
#
# Table name: previous_project_images
#
#  id                      :bigint           not null, primary key
#  cover                   :boolean
#  position                :integer
#  uid                     :string
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  off_platform_project_id :bigint           not null
#
# Indexes
#
#  index_previous_project_images_on_off_platform_project_id  (off_platform_project_id)
#
# Foreign Keys
#
#  fk_rails_...  (off_platform_project_id => off_platform_projects.id)
#
