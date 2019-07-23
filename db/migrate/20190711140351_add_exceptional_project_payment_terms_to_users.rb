class AddExceptionalProjectPaymentTermsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :exceptional_project_payment_terms, :string
  end
end
