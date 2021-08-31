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
#  id            :bigint           not null, primary key
#  active        :boolean
#  calendly_url  :string
#  email         :string
#  first_name    :string
#  last_name     :string
#  out_of_office :boolean
#  slack         :string
#  uid           :string           not null
#  username      :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  airtable_id   :string
#  asana_id      :string
#
# Indexes
#
#  index_sales_people_on_uid       (uid) UNIQUE
#  index_sales_people_on_username  (username) UNIQUE
#
