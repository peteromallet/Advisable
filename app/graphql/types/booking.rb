class Types::Booking < Types::BaseType
  field :id, ID, null: false
  field :airtable_id, ID, null: false
  field :type, String, null: true
  field :rate, Float, null: true
  field :rate_type, String, null: true
  field :rate_limit, Float, null: true
  field :status, String, null: true
  field :duration, String, null: true
  field :proposal_comment, String, null: true
  field :deliverables, [String], null: true
  field :start_date, Types::Date, null: true
  field :end_date, Types::Date, null: true
  field :application, Types::ApplicationType, null: false
  field :tasks, [Types::TaskType], null: true do
    authorize :is_specialist_or_client
  end
  
  field :task, Types::TaskType, null: true do
    authorize :is_specialist_or_client
    argument :id, ID, required: true
  end

  def id
    object.airtable_id
  end

  def task(id: )
    object.tasks.find_by_airtable_id!(id)
  end
end
