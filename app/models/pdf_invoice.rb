# frozen_string_literal: true

class PdfInvoice < ApplicationRecord
  belongs_to :company
  URL_EXPIRES_AT = 1.hour.to_i

  def url
    obj = Aws::S3::Object.new(bucket_name: ENV["AWS_S3_BUCKET"], key: key)
    obj.presigned_url(:get, expires_in: URL_EXPIRES_AT)
  end
end

# == Schema Information
#
# Table name: pdf_invoices
#
#  id         :bigint           not null, primary key
#  key        :string
#  month      :integer
#  year       :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  company_id :uuid             not null
#
# Indexes
#
#  index_pdf_invoices_on_company_id  (company_id)
#
# Foreign Keys
#
#  fk_rails_...  (company_id => companies.id)
#
