class Types::Review < Types::BaseType
  field :id, ID, null: false
  field :avatar, String, null: true
  field :comment, String, null: true
  field :type, String, null: true
  field :ratings, Types::Ratings, null: true
  field :name, String, null: true
  field :role, String, null: true
  field :specialist, Types::SpecialistType, null: false
  field :company_name, String, null: true

  def id
    object.uid
  end

  def avatar
    return nil unless object.project.try(:is_a?, PreviousProject)

    if object.project.contact_image.attached?
      (
        Rails.application.routes.url_helpers.rails_blob_url(
          object.project.contact_image,
          host:
            ENV['ORIGIN'] || "https://#{ENV['HEROKU_APP_NAME']}.herokuapp.com"
        )
      )
    end
  end

  def name
    return object.project.user.name if object.project.is_a?(Project)
    object.project.try(:contact_name)
  end

  def role
    return object.project.user.title if object.project.is_a?(Project)
    object.project.try(:contact_job_title)
  end

  def company_name
    return object.project.user.company_name if object.project.is_a?(Project)
    object.project.try(:client_name)
  end
end
