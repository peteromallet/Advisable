class AddClientReferralUrlToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :client_referral_url, :string
  end
end
