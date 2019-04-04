class Airtable::Task < Airtable::Base
  self.table_name = "Booking Tasks"
  
  sync_with ::Task
  sync_column 'Name', to: :name
  sync_column 'Stage', to: :stage
  sync_column 'Estimate', to: :estimate
  sync_column 'Due Date', to: :due_date
  sync_column 'Description', to: :description
  sync_column 'Submitted For Approval Comment', to: :submitted_for_approval_comment
  sync_association "Booking", to: :booking

  push_data do |task|
    self['Name'] = task.name
  end
end