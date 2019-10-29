class CreateBlacklistedDomains < ActiveRecord::Migration[6.0]
  def change
    create_table :blacklisted_domains do |t|
      t.string :domain

      t.timestamps
    end
  end
end
