class Types::InvoiceType < Types::BaseType
  field :id, ID, null: false
  field :created_at, GraphQL::Types::ISO8601DateTime, null: false
  field :due_date, GraphQL::Types::ISO8601DateTime, null: true
  field :number, String, null: false
  field :status, String, null: false
  field :amount, Int, null: false
  field :customer_name, String, null: true
  field :customer_address, Types::AddressType, null: true
  field :description, String, null: true
  field :download_url, String, null: true
  field :payment_url, String, null: true
  field :line_items, [Types::InvoiceLineItemType], null: false

  def created_at
    Time.at(object.created).utc.iso8601
  end

  def amount
    object.amount_due
  end

  def due_date
    return if object.due_date.nil?
    Time.at(object.due_date).utc.iso8601
  end

  def download_url
    object.invoice_pdf
  end

  def payment_url
    object.hosted_invoice_url
  end

  def customer_address
    return if object.customer_address.nil?
    {
      line1: object.customer_address.line1,
      line2: object.customer_address.line2,
      city: object.customer_address.city,
      state: object.customer_address.state,
      country: object.customer_address.country,
      postcode: object.customer_address.postal_code
    }
  end

  def line_items
    object.lines
  end
end
