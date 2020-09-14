class AddUidToAnswers < ActiveRecord::Migration[6.0]
  def change
    add_column :answers, :uid, :string, index: true
  end
end
