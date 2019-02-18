# Used to update an application record during the application process.
class Mutations::SubmitApplication < Mutations::BaseMutation
  argument :id, ID, required: true

  field :application, Types::ApplicationType, null: true
  field :errors, [String], null: true

  def resolve(**args)
    begin
      application = Application.find_by_airtable_id!(args[:id])
      {
        application: Applications::Submit.call(application)
      }
    rescue Service::Error, ActiveRecord::RecordNotFound => e
      {
        errors: [e.message]
      }
    end
  end
end