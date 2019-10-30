# Class for syncing airtable client contacts to our local users table
class Airtable::ClientCall < Airtable::Base
  self.table_name = 'Client Calls'

  sync_with ::ClientCall
  sync_column 'Duration', to: :duration
  sync_association 'Project', to: :project
  sync_column 'Creation Time', to: :created_at
  sync_column 'Call Time', to: :call_time
  sync_column 'Phone Number', to: :phone_number
  sync_column 'Email Address', to: :email
  sync_column 'Event Type', to: :event_type
  sync_column 'Email Address', to: :email
  sync_column 'Calendly ID', to: :calendly_id
  sync_association 'Owner', to: :sales_person
  sync_column 'Type Of Call', to: :type_of_call

  sync_data do |client_call|
    client_call.cancelled = true if self['Cancelled'].try(:include?, "Yes")
    client_call.cancelled = false if self['Cancelled'].try(:include?, "No")

    user_id = fields["Client Contact"].try(:first)
    if user_id
      user = ::User.find_by_airtable_id(user_id)
      user = Airtable::ClientContact.find(user_id).sync if user.nil?
      client_call.user = user
    end
  end
end