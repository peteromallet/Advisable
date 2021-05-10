# frozen_string_literal: true

class AddCoverPhotoToPreviousProject < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      add_reference :off_platform_projects, :cover_photo, foreign_key: {to_table: :active_storage_attachments}
    end
  end
end
