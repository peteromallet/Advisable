class Types::OauthViewer < Types::BaseType
  field :name, String, null: false
  field :first_name, String, null: false
  field :image, String, null: false
  field :can_validate_project, Boolean, null: false do
    argument :id, ID, required: true
  end

  def can_validate_project(id:)
    project = PreviousProject.find_by_uid(id)
    object.can_validate_project?(project)
  end
end
