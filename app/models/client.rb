class Client < ApplicationRecord
  include Airtable::Syncable
  has_many :projects
  has_many :applications, through: :projects
  has_many :client_users
  has_many :users, through: :client_users
  has_many :interviews, through: :applications
end

# == Schema Information
#
# Table name: clients
#
#  id          :bigint           not null, primary key
#  domain      :string
#  name        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  airtable_id :string
#
# Indexes
#
#  index_clients_on_airtable_id  (airtable_id)
#
