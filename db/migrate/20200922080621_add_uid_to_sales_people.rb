class AddUidToSalesPeople < ActiveRecord::Migration[6.0]
  def up
    add_column :sales_people, :uid, :string, index: true

    SalesPerson.where(uid: nil).find_each do |sp|
      sp.send(:generate_uid)
      sp.save(validate: false, touch: false)
    end
  end

  def down
    remove_colum :sales_people, :uid, :string, index: true
  end
end
