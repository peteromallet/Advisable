# frozen_string_literal: true

class Invoice < ApplicationRecord
  class InvoiceError < StandardError; end

  include Uid
  uid_prefix 'inv'

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

  def total(for_specialist: false)
    if for_specialist
      line_items.select(&:charge_freelancer?).sum(&:amount)
    else
      line_items.sum(:amount)
    end
  end

  def create_admin_fee!
    raise InvoiceError, "Fee already created on this invoice" if line_items.any? { |li| li.metadata["charge_freelancer"] == false }

    line_item = line_items.create!(
      name: "Admin fee",
      amount: total * company.admin_fee_percentage,
      metadata: {charge_freelancer: false}
    )
    line_item.create_in_stripe!(now: true)
  end

  def apply_deposit!
    project = application.project
    deposit_left = project.deposit_paid - project.deposit_used
    return if deposit_left <= 0

    line_item = line_items.create!(
      name: "Deposit",
      amount: 0 - deposit_left,
      metadata: {charge_freelancer: false}
    )
    line_item.create_in_stripe!(now: true)

    raise InvoiceError, "Something went wrong when applying deposit" if line_item.reload.stripe_invoice_line_item_id.blank?

    project.update(deposit_used: deposit_left)
  end
end

# == Schema Information
#
# Table name: invoices
#
#  id                :bigint           not null, primary key
#  exported_at       :datetime
#  paid_at           :datetime
#  paid_out_at       :datetime
#  period_end        :datetime
#  period_start      :datetime
#  status            :integer          default("draft")
#  uid               :string           not null
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
