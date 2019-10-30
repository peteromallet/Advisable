class RemoveClientCallsNullConstraints < ActiveRecord::Migration[6.0]
  def change
    change_column_null(:client_calls, :project_id, true)
    change_column_null(:client_calls, :sales_person_id, true)
    change_column_null(:client_calls, :user_id, true)
  end
end
