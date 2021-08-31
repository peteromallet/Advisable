# frozen_string_literal: true

class SalesPersonUsernameNotNull < ActiveRecord::Migration[6.1]
  def change
    add_check_constraint :sales_people, "username IS NOT NULL", name: "sales_people_username_null", validate: false
  end
end
