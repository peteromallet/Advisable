class RemoveUsesRemainingFromMagicLinks < ActiveRecord::Migration[6.0]
  def change
    remove_column :magic_links, :uses_remaining, :integer
  end
end
