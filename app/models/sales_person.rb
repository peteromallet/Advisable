# frozen_string_literal: true

class SalesPerson < ApplicationRecord
  include ::Airtable::Syncable
  include Uid
  include Resizable

  has_many :companies, dependent: :nullify
  has_many :interviewees, class_name: "Specialist", inverse_of: :interviewer, foreign_key: :interviewer_id, dependent: :nullify
  validates :username, uniqueness: true, presence: true

  has_one_attached :image
  resize image: {resize_to_limit: [400, 400]}

  def self.default_for_user
    find_by(username: ENV["SALES_PERSON_USER_DEFAULT"])
  end

  def self.default_for_specialist
    find_by(username: ENV["SALES_PERSON_SPECIALIST_DEFAULT"])
  end

  def name
    "#{first_name} #{last_name}"
  end

  def email_with_name
    %("#{name}" <#{email}>)
  end
end

# == Schema Information
#
# Table name: sales_people
#
#  id            :integer          not null, primary key
#  first_name    :string
#  last_name     :string
#  email         :string
#  username      :string           not null
#  active        :boolean
#  out_of_office :boolean
#  slack         :string
#  calendly_url  :string
#  asana_id      :string
#  airtable_id   :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  uid           :string           not null
#
# Indexes
#
#  index_sales_people_on_uid       (uid) UNIQUE
#  index_sales_people_on_username  (username) UNIQUE
#
