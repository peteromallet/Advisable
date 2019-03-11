class Types::User < Types::BaseType
  field :id, ID, null: false
  field :airtable_id, String, null: false
  field :name, String, null: true
  field :first_name, String, null: true
  field :last_name, String, null: true
  field :title, String, null: true
  field :companyName, String, null: true
  field :setup_required, Boolean, null: false
  field :country, Types::CountryType, null: true
  field :projects, [Types::ProjectType], null: true
  field :confirmed, Boolean, null: false
  field :availability, [GraphQL::Types::ISO8601DateTime], null: false do
    argument :exclude_conflicts, Boolean, required: false, description: 'Exclude any times that conflict with scheduled interviews'
  end

  field :email, String, null: false do
    authorize :is_user
  end

  # Exclude any projects where the sales status is 'Lost'. We need to use an
  # or statement here otherwise SQL will also exclude records where sales_status
  # is null.
  def projects
    object.projects.where.not(sales_status: "Lost")
      .or(object.projects.where(sales_status: nil))
  end

  def availability(exclude_conflicts: false)
    times = object.availability || []
    if exclude_conflicts
      interviews = object.interviews.scheduled.map(&:starts_at)
      times.reject! { |t| interviews.include?(t) }
    end
    times
  end
end
