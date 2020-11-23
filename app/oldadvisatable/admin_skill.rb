class AdminSkill < Advisatable::Resource
  set_model Skill
  column :name, Advisatable::Columns::String
end
