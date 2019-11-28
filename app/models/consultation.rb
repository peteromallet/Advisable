class Consultation < ApplicationRecord
  include Uid
  include Airtable::Syncable
  belongs_to :specialist
  belongs_to :user
  belongs_to :interview, required: false
end
