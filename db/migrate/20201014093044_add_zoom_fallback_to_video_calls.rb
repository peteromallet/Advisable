class AddZoomFallbackToVideoCalls < ActiveRecord::Migration[6.0]
  def change
    add_column :video_calls, :fallback, :boolean
    add_column :video_calls, :zoom_meeting_id, :string
    add_column :video_calls, :zoom_passcode, :string
    add_column :video_calls, :zoom_url, :string
  end
end
