class RemoveReferralUrlFromApplication < ActiveRecord::Migration[6.0]
  def change
    remove_column :applications, :referral_url, :string
  end
end
