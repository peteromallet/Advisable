class AddAirtableFieldsToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :owner, :string
    add_column :projects, :campaign_source, :string
    add_column :projects, :brief_pending_confirmation_at, :datetime
    add_column :projects, :brief_confirmed_at, :datetime
    add_column :projects, :interview_scheduled_at, :datetime
    add_column :projects, :call_scheduled_at, :datetime
    add_column :projects, :candidate_proposed_at, :datetime
    add_column :projects, :candidate_accepted_at, :datetime
    add_column :projects, :interview_completed_at, :datetime
    add_column :projects, :booking_request_sent_at, :datetime
    add_column :projects, :booking_confirmed_at, :datetime
    add_column :projects, :proposal_received_at, :datetime
    add_column :projects, :won_at, :datetime
    add_column :projects, :lost_at, :datetime
  end
end
