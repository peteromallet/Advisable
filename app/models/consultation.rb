class Consultation < ApplicationRecord
  include Uid
  include Airtable::Syncable
  belongs_to :specialist
  belongs_to :user
  belongs_to :skill
  belongs_to :interview, required: false

  validates :skill_id, presence: true
  validates :user_id, presence: true
  validates :specialist_id, presence: true
end
