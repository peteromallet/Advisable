# frozen_string_literal: true

module CaseStudy
  class Company < ApplicationRecord
    include Resizable

    has_logidze

    has_many :articles, dependent: :destroy

    has_one_attached :logo
    resize logo: {resize_to_limit: [400, 400]}
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
