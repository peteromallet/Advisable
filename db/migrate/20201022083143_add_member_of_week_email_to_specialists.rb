class AddMemberOfWeekEmailToSpecialists < ActiveRecord::Migration[6.0]
  def change
    add_column :specialists, :member_of_week_email, :integer
  end
end
