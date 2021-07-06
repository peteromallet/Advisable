# frozen_string_literal: true

class InvoiceLineItem < ApplicationRecord
  include Uid
  uid_prefix 'ili'

  CURRENCY = "usd"

  belongs_to :invoice
  belongs_to :task, optional: true

  def metadata
    super.presence || {}
  end

  def charge_freelancer?
    metadata["charge_freelancer"] != false
  end

  def create_in_stripe!(now: false)
    return if stripe_invoice_line_item_id.present?

    method = now ? :perform_now : :perform_later
    Stripe::CreateInvoiceLineItemJob.public_send(method, self)
  end
end

# == Schema Information
#
# Table name: invoice_line_items
#
#  id                          :bigint           not null, primary key
#  amount                      :integer
#  metadata                    :jsonb
#  name                        :string
#  uid                         :string           not null
#  created_at                  :datetime         not null
#  updated_at                  :datetime         not null
#  invoice_id                  :bigint           not null
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
