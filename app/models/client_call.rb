class ClientCall < ApplicationRecord
  belongs_to :project, required: false
  belongs_to :sales_person, required: false
  belongs_to :user, required: false
end
