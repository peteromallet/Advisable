class AddReferralUrlToApplications < ActiveRecord::Migration[5.2]
  def change
    add_column :applications, :referral_url, :string
  end
end
