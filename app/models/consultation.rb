class Consultation < ApplicationRecord
  include Uid
  belongs_to :specialist
  belongs_to :user
end
