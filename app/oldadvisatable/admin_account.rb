class AdminAccount < Advisatable::Resource
  set_model Account
  column :name, Advisatable::Columns::String, readonly: true
  column :first_name, Advisatable::Columns::String
  column :last_name, Advisatable::Columns::String
  column :email, Advisatable::Columns::String
end
