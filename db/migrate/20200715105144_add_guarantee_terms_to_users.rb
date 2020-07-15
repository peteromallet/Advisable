class AddGuaranteeTermsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :accepted_guarantee_terms_at, :datetime
  end
end
