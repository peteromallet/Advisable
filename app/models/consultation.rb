class Consultation < ApplicationRecord
  include Uid
  include Airtable::Syncable
  belongs_to :specialist
  belongs_to :user
  belongs_to :skill
  belongs_to :search, required: false
  belongs_to :interview, required: false
end
