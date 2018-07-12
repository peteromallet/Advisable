class RenameRejectionReasons < ActiveRecord::Migration[5.2]
  def change
    rename_table :rejection_reasons, :application_rejection_reasons
  end
end
