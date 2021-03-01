# frozen_string_literal: true

class InvoiceLineItem < ApplicationRecord
  CURRENCY = "usd"

  belongs_to :invoice
  belongs_to :task, optional: true

  def create_in_stripe!
    return if stripe_invoice_line_item_id.present?

    attrs = {
      customer: invoice.company.stripe_customer_id,
      amount: amount,
      currency: CURRENCY,
      description: name
    }
    attrs[:invoice] = invoice.stripe_invoice_id if invoice.stripe_invoice_id.present?

    response = Stripe::InvoiceItem.create(attrs)
    update!(stripe_invoice_line_item_id: response.id)
  end
end

# == Schema Information
#
# Table name: invoice_line_items
#
#  id                          :uuid             not null, primary key
#  amount                      :integer
#  name                        :string
#  created_at                  :datetime         not null
#  updated_at                  :datetime         not null
#  invoice_id                  :uuid             not null
#  stripe_invoice_line_item_id :string
#  task_id                     :bigint
#
# Indexes
#
#  index_invoice_line_items_on_invoice_id  (invoice_id)
#  index_invoice_line_items_on_task_id     (task_id)
#
# Foreign Keys
#
#  fk_rails_...  (invoice_id => invoices.id)
#  fk_rails_...  (task_id => tasks.id)
#
