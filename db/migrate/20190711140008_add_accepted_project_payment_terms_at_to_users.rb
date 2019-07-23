class AddAcceptedProjectPaymentTermsAtToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :accepted_project_payment_terms_at, :datetime
  end
end
