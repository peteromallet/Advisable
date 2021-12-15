# frozen_string_literal: true

module CaseStudy
  class Company < ApplicationRecord
    include Resizable
    include Uid
    uid_prefix "csm"

    has_logidze

    has_many :articles, dependent: :destroy

    has_one_attached :favicon
    has_one_attached :logo
    resize logo: {resize_to_limit: [400, 400]}
  end
end

# == Schema Information
#
# Table name: case_study_companies
#
#  id            :integer          not null, primary key
#  uid           :string           not null
#  name          :string
#  description   :text
#  website       :string
#  business_type :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# Indexes
#
#  index_case_study_companies_on_uid  (uid) UNIQUE
#
