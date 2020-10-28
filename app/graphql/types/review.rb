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
    return unless project.is_a?(PreviousProject)

    if project.contact_image.attached?
      host = ENV['ORIGIN'] || "https://#{ENV['HEROKU_APP_NAME']}.herokuapp.com"
      Rails.application.routes.url_helpers.rails_blob_url(project.contact_image, host: host)
    end
  end

  def name
    if project.is_a?(Project)
      project.user.account.name
    else
      project.try(:contact_name)
    end
  end

  def role
    if project.is_a?(Project)
      project.user.title
    else
      project.try(:contact_job_title)
    end
  end

  def company_name
    if project.is_a?(Project)
      project.user.company_name
    else
      project.try(:client_name)
    end
  end

  private

  def project
    object.project
  end
end
