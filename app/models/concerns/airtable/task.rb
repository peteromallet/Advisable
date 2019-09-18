class Airtable::Task < Airtable::Base
  self.table_name = "Booking Tasks"
  
  sync_with ::Task
  sync_column 'Name', to: :name
  sync_column 'Stage', to: :stage
  sync_column 'Repeat', to: :repeat
  sync_column 'Estimate', to: :estimate
  sync_column 'Flexible Estimate', to: :flexible_estimate
  sync_column 'Due Date', to: :due_date
  sync_column 'Description', to: :description
  sync_column 'Hours Worked', to: :hours_worked
  sync_column 'Submitted For Approval Comment', to: :submitted_for_approval_comment
  sync_association "Application", to: :application

  sync_data do |task|
    task.trial = true if fields['Trial'] == 'Yes'
    task.trial = false if fields['Trial'] == 'No'
  end

  push_data do |task|
    self['ID'] = task.uid
    self['Name'] = task.name
    self['Stage'] = task.stage
    self['Estimate'] = task.estimate.try(:to_i)
    self['Hours Worked'] = task.hours_worked
    self['Flexible Estimate'] = task.flexible_estimate
    self['Application'] = [task.application.try(:airtable_id)]
    self['Due Date'] = task.due_date.try(:strftime, "%Y-%m-%d")
    self['Description'] = task.description
    self['Repeat'] = task.repeat
    self['Trial'] = "Yes" if task.trial === true
    self['Trial'] = "No" if task.trial === false
  end
end