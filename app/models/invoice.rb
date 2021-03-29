# frozen_string_literal: true

class Invoice < ApplicationRecord
  DAYS_DUE = 30

  enum status: {draft: 0, open: 1, paid: 2, exported: 3, paid_out: 4, void: 5}

  belongs_to :company
  belongs_to :application
  delegate :specialist, to: :application

  has_many :line_items, class_name: "InvoiceLineItem", dependent: :destroy

  def create_in_stripe!
    return if stripe_invoice_id.present?

    Stripe::CreateInvoiceJob.perform_later(self)
  end
end

# == Schema Information
#
# Table name: invoices
#
#  id                :uuid             not null, primary key
#  exported_at       :datetime
#  paid_at           :datetime
#  paid_out_at       :datetime
#  period_end        :datetime
#  period_start      :datetime
#  status            :integer          default("draft")
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  application_id    :bigint           not null
#  company_id        :uuid             not null
#  stripe_invoice_id :string
#
# Indexes
#
#  index_invoices_on_application_id  (application_id)
#  index_invoices_on_company_id      (company_id)
#
# Foreign Keys
#
#  fk_rails_...  (application_id => applications.id)
#  fk_rails_...  (company_id => companies.id)
#
