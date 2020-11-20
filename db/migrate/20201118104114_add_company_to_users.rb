class AddCompanyToUsers < ActiveRecord::Migration[6.0]
  def change
    safety_assured do
      add_reference :users, :company, type: :uuid, foreign_key: true
    end
  end
end
