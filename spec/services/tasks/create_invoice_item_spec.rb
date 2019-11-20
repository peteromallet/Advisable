require 'rails_helper'

describe Tasks::CreateInvoiceItem do
  let(:task) { create(:task, stage: "Assigned") }

  it "Calls the Users::AddInvoiceItem service" do
    invoice_item = double("InvoiceItem", { id: "1234" })

    expect(Users::AddInvoiceItem).to receive(:call).with({
      user: task.application.project.user,
      amount: (task.cost * 100).to_i,
      description: "#{task.name} + #{task.application.specialist.name}"
    }).and_return(invoice_item)

    Tasks::CreateInvoiceItem.call(task: task)
  end

  it "saves the stripe_invoice_id" do
    invoice_item = double("InvoiceItem", { id: "1234" })
    allow(Users::AddInvoiceItem).to receive(:call).and_return(invoice_item)
    expect {
      Tasks::CreateInvoiceItem.call(task: task)
    }.to change {
      task.reload.stripe_invoice_id
    }.from(nil).to(invoice_item.id)
  end

  context "When the application project_type is not 'Fixed'" do
    let(:application) { create(:application, project_type: "Flexible" )}
    let(:task) { create(:task, application: application) }

    it "raises an error" do
      expect {
        Tasks::CreateInvoiceItem.call(task: task)
      }.to raise_error(/Can\'t create an invoice for a/)
    end
  end
end