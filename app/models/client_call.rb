# frozen_string_literal: true

class ClientCall < ApplicationRecord
  include ::Airtable::Syncable
  belongs_to :project, optional: true
  belongs_to :sales_person, optional: true
  belongs_to :user, optional: true
end

# == Schema Information
#
# Table name: client_calls
#
#  id                 :integer          not null, primary key
#  airtable_id        :string
#  duration           :integer
#  project_id         :integer
#  call_time          :datetime
#  phone_number       :string
#  email              :string
#  event_type         :string
#  calendly_id        :string
#  cancelled          :boolean
#  sales_person_id    :integer
#  type_of_call       :string
#  user_id            :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  call_attempt_count :integer
#
# Indexes
#
#  index_client_calls_on_airtable_id      (airtable_id)
#  index_client_calls_on_project_id       (project_id)
#  index_client_calls_on_sales_person_id  (sales_person_id)
#  index_client_calls_on_user_id          (user_id)
#
