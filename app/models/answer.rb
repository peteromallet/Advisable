class Answer < ApplicationRecord
  include Uid

  belongs_to :question
  belongs_to :specialist
end

# == Schema Information
#
# Table name: answers
#
#  id            :bigint           not null, primary key
#  content       :string
#  uid           :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  question_id   :bigint           not null
#  specialist_id :bigint           not null
#
# Indexes
#
#  index_answers_on_question_id    (question_id)
#  index_answers_on_specialist_id  (specialist_id)
#
# Foreign Keys
#
#  fk_rails_...  (question_id => questions.id)
#  fk_rails_...  (specialist_id => specialists.id)
#
