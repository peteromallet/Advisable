class AddZoomMeetingIdToInterviews < ActiveRecord::Migration[6.0]
  def change
    add_column :interviews, :zoom_meeting_id, :string
  end
end
