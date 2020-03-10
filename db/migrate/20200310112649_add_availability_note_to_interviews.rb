class AddAvailabilityNoteToInterviews < ActiveRecord::Migration[6.0]
  def change
    add_column :interviews, :availability_note, :string
  end
end
