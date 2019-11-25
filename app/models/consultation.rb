class Consultation < ApplicationRecord
  belongs_to :specialist
  belongs_to :user
end
