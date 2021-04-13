# frozen_string_literal: true

class PreviousProjectImage < ApplicationRecord
  include Resizable
  include Uid
  uid_prefix 'ppi'

  belongs_to :previous_project, class_name: 'PreviousProject', foreign_key: 'off_platform_project_id', inverse_of: :images
  has_one_attached :image
  resize image: {resize_to_limit: [1600, 1600]}

  after_destroy :set_first_to_cover, if: :cover
  after_destroy :reduce_positions

  private

  def reduce_positions
    always_fresh_previous_project.images.where('position > ?', position).find_each do |ppi|
      ppi.update position: ppi.position - 1
    end
  end

  def set_first_to_cover
    always_fresh_previous_project.images.order(position: :asc).first.try(
      :update,
      cover: true
    )
  end

  # Needed because of after_destroy hooks where the object is gone
  def always_fresh_previous_project
    @always_fresh_previous_project ||= PreviousProject.find(off_platform_project_id)
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
