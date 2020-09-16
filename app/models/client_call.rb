class ClientCall < ApplicationRecord
  include Airtable::Syncable
  belongs_to :project, required: false
  belongs_to :sales_person, required: false
  belongs_to :user, required: false
end

# == Schema Information
#
# Table name: client_calls
#
#  id                 :bigint           not null, primary key
#  call_attempt_count :integer
#  call_time          :datetime
#  cancelled          :boolean
#  duration           :integer
#  email              :string
#  event_type         :string
#  phone_number       :string
#  type_of_call       :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  airtable_id        :string
#  calendly_id        :string
#  project_id         :bigint
#  sales_person_id    :bigint
#  user_id            :bigint
#
# Indexes
#
#  index_client_calls_on_airtable_id      (airtable_id)
#  index_client_calls_on_project_id       (project_id)
#  index_client_calls_on_sales_person_id  (sales_person_id)
#  index_client_calls_on_user_id          (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (project_id => projects.id)
#  fk_rails_...  (sales_person_id => sales_people.id)
#  fk_rails_...  (user_id => users.id)
#
