# frozen_string_literal: true

class ApplicationReference < ApplicationRecord
  include Uid
  uid_prefix 'ref'

  belongs_to :application
  belongs_to :previous_project, foreign_key: :off_platform_project_id, inverse_of: :application_references
end

# == Schema Information
#
# Table name: application_references
#
#  id                      :bigint           not null, primary key
#  uid                     :string           not null
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  application_id          :bigint
#  off_platform_project_id :bigint
#
# Indexes
#
#  index_application_references_on_application_id           (application_id)
#  index_application_references_on_off_platform_project_id  (off_platform_project_id)
#  index_application_references_on_uid                      (uid) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (application_id => applications.id)
#  fk_rails_...  (off_platform_project_id => off_platform_projects.id)
#
