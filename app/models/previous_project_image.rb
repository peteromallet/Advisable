# frozen_string_literal: true

class PreviousProjectImage < ApplicationRecord
  include Resizable
  include Uid
  uid_prefix 'ppi'

  belongs_to :previous_project, class_name: 'PreviousProject', foreign_key: 'off_platform_project_id', inverse_of: :images
  has_one_attached :image
  resize image: {resize_to_limit: [1600, 1600]}
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
