class Task < ApplicationRecord
  include UID
  include Airtable::Syncable
  belongs_to :booking
end
