# frozen_string_literal: true

module CaseStudy
  class Company < ApplicationRecord
    include Resizable
    include Uid
    uid_prefix "csm"

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
#  id            :bigint           not null, primary key
#  business_type :string
#  description   :text
#  name          :string
#  uid           :string           not null
#  website       :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# Indexes
#
#  index_case_study_companies_on_uid  (uid)
#
