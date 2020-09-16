class ApplicationReference < ApplicationRecord
  include Uid
  uid_prefix 'ref'

  belongs_to :application
  belongs_to :project, polymorphic: true
end

# == Schema Information
#
# Table name: application_references
#
#  id             :bigint           not null, primary key
#  project_type   :string
#  uid            :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  application_id :bigint
#  project_id     :bigint
#
# Indexes
#
#  index_application_references_on_application_id               (application_id)
#  index_application_references_on_project_type_and_project_id  (project_type,project_id)
#  index_application_references_on_uid                          (uid)
#
# Foreign Keys
#
#  fk_rails_...  (application_id => applications.id)
#
