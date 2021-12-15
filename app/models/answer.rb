# frozen_string_literal: true

class Answer < ApplicationRecord
  include Uid

  belongs_to :question
  belongs_to :specialist
end

# == Schema Information
#
# Table name: answers
#
#  id            :integer          not null, primary key
#  content       :string
#  question_id   :integer          not null
#  specialist_id :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  uid           :string           not null
#
# Indexes
#
#  index_answers_on_question_id    (question_id)
#  index_answers_on_specialist_id  (specialist_id)
#  index_answers_on_uid            (uid) UNIQUE
#
