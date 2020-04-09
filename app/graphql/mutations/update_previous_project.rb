class Mutations::UpdatePreviousProject < Mutations::BaseMutation
  argument :previous_project, ID, required: true
  argument :client_name, String, required: true
  argument :confidential, Boolean, required: false
  argument :industries, [String], required: true
  argument :primary_industry, String, required: true
  argument :company_type, String, required: true

  field :previous_project, Types::PreviousProject, null: true

  def resolve(**args)
    project = PreviousProject.find_by_uid(args[:previous_project])
    project.assign_attributes(assignable_attrs(args))
    project.save
    return { previous_project: project }
  end

  private

  def assignable_attrs(**args)
    args.slice(:client_name, :confidential, :company_type)
  end
end
