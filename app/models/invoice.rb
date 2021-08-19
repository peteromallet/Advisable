# frozen_string_literal: true

class Invoice < ApplicationRecord
  include Uid
  URL_EXPIRES_AT = 1.hour.to_i

  belongs_to :company

  validates :year, :month, presence: true
  validates :month, uniqueness: {scope: %i[company_id year]}

  def date_range
    @date_range ||= Date.parse("1.#{month}.#{year}").all_month
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
#  uid        :string
#  year       :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  company_id :uuid             not null
#
# Indexes
#
#  index_invoices_on_company_id                     (company_id)
#  index_invoices_on_company_id_and_year_and_month  (company_id,year,month) UNIQUE
#  index_invoices_on_uid                            (uid)
#
# Foreign Keys
#
#  fk_rails_...  (company_id => companies.id)
#
