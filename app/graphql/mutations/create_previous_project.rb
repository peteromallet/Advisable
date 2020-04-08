class Mutations::CreatePreviousProject < Mutations::BaseMutation
  # TODO: Eventually the specialist ID should be removed and this mutation should expect a specialist to be logged in.
  argument :specialist, ID, required: true
  argument :client_name, String, required: true
  argument :confidential, Boolean, required: false
  argument :industries, [String], required: true
  argument :primary_industry, String, required: true
  argument :company_type, String, required: true

  field :previous_project, Types::PreviousProject, null: true

  def resolve(**args)
    specialist = Specialist.find_by_uid_or_airtable_id!(args[:specialist])

    project =
      specialist.previous_projects.new(
        client_name: args[:client_name],
        confidential: args[:confidential],
        company_type: args[:company_type],
        description: args[:description],
        draft: true
      )

    args[:industries].each do |industry|
      project.project_industries <<
        ProjectIndustry.new(
          industry: Industry.find_by_name!(industry),
          primary: args[:primary_industry] == industry
        )
    end

    project.save
    project.sync_to_airtable

    { previous_project: project }
  end
end
