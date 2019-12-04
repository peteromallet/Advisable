class RemoveNullConstraintFromConsultations < ActiveRecord::Migration[6.0]
  def change
    # Allow user and specialist to be null to prevent airtable syncing from throwing
    # an error for incomplete data
    change_column_null :consultations, :user_id, true
    change_column_null :consultations, :specialist_id, true
  end
end
