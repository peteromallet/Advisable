class AddReadByToMessages < ActiveRecord::Migration[6.1]
  def change
    add_column :messages, :read_by, :jsonb
  end
end
