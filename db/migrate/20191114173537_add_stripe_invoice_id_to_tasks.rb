class AddStripeInvoiceIdToTasks < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :stripe_invoice_id, :string
  end
end
