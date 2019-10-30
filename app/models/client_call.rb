class ClientCall < ApplicationRecord
  belongs_to :project
  belongs_to :sales_person
  belongs_to :user
end
