class AddCallAttemptCountToClientCalls < ActiveRecord::Migration[6.0]
  def change
    add_column :client_calls, :call_attempt_count, :int
  end
end
