# frozen_string_literal: true

class Invoice < ApplicationRecord
  include Uid
  URL_EXPIRES_AT = 1.hour.to_i

  belongs_to :company

  validates :year, :month, presence: true
  validates :month, uniqueness: {scope: %i[company_id year]}

  def date_range
    first_day = Date.new(year, month, 1)
    first_day_next_month = first_day.next_month
    @date_range ||= (first_day..first_day_next_month)
  end

  def payments
    company.payments.with_status("succeeded").where(created_at: date_range)
  end

  def pdf_url(regenerate: false)
    self.key = nil if regenerate
    GenerateInvoicePdfJob.perform_now(self) if key.blank?
    obj = Aws::S3::Object.new(bucket_name: ENV["AWS_S3_BUCKET"], key: key)
    obj.presigned_url(:get, expires_in: URL_EXPIRES_AT)
  end
end

# == Schema Information
#
# Table name: invoices
#
#  id         :bigint           not null, primary key
#  key        :string
#  month      :integer          not null
#  uid        :string           not null
#  year       :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  company_id :uuid             not null
#
# Indexes
#
#  index_invoices_on_company_id                     (company_id)
#  index_invoices_on_company_id_and_year_and_month  (company_id,year,month) UNIQUE
#  index_invoices_on_uid                            (uid) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (company_id => companies.id)
#
