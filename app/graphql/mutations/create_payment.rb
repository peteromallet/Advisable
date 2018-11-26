class Mutations::CreatePayment < Mutations::BaseMutation
  argument :project_id, ID, required: true
  argument :source, ID, required: true
  argument :amount, Int, required: false

  field :payment, Types::Payment, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    begin
      project = Project.find_by_airtable_id(args[:project_id])
      payment = Payments::Create.call(project: project, source_id: args[:source], amount: args[:amount])
      return { payment: payment }
    rescue Service::Error => e
      return { errors: [e] }
    end
  end
end
