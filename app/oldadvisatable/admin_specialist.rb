class AdminSpecialist < Advisatable::Resource
  set_model Specialist
  column :account, Advisatable::Columns::BelongsTo, resource: AdminAccount, labelled_by: :name
  column :linkedin, Advisatable::Columns::String
end
