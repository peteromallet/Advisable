class AddUidToQuestions < ActiveRecord::Migration[6.0]
  def change
    add_column :questions, :uid, :string, index: true
  end
end
