class Answer < ApplicationRecord
  include Uid

  belongs_to :question
  belongs_to :specialist
end
