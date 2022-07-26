class InsightsNullAirtableId < ActiveRecord::Migration[7.0]
  def change
    change_column_null :case_study_insights, :airtable_id, true
  end
end
