class AdminApplication < Advisatable::Resource
  set_model Application
  column :specialist, Advisatable::Columns::BelongsTo, resource: AdminSpecialist, labelled_by: :account
  column :status, Advisatable::Columns::SingleSelect, options: []
  column :score, Advisatable::Columns::Number, percision: 2
end
