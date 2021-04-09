# frozen_string_literal: true

module CaseStudy
  class Company < ApplicationRecord
    has_many :articles, dependent: :destroy
  end
end

# == Schema Information
#
# Table name: case_study_companies
#
#  id            :uuid             not null, primary key
#  business_type :string
#  description   :text
#  name          :string
#  website       :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
