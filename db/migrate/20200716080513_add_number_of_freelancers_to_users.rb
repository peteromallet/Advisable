class AddNumberOfFreelancersToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :number_of_freelancers, :string
  end
end
