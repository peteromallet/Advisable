class Question < ApplicationRecord
  include Uid
end

# == Schema Information
#
# Table name: questions
#
#  id         :bigint           not null, primary key
#  content    :string
#  uid        :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
