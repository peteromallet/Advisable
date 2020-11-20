class AddReferencesToCompanies < ActiveRecord::Migration[6.0]
  def change
    safety_assured do
      add_reference :companies, :sales_person, foreign_key: true
      add_reference :companies, :industry, foreign_key: true
    end
  end
end
