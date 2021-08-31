# frozen_string_literal: true

class ValidateSalesPersonUsernameNotNull < ActiveRecord::Migration[6.1]
  def change
    validate_check_constraint :sales_people, name: "sales_people_username_null"
    change_column_null :sales_people, :username, false
    remove_check_constraint :sales_people, name: "sales_people_username_null"
  end
end
