# frozen_string_literal: true

class Question < ApplicationRecord
  include Uid
end

# == Schema Information
#
# Table name: questions
#
#  id         :integer          not null, primary key
#  content    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  uid        :string           not null
#
# Indexes
#
#  index_questions_on_uid  (uid) UNIQUE
#
