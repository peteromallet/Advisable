class PreviousProject::Verifier
  attr_reader :oauth_viewer, :project

  def initialize(viewer, project)
    @oauth_viewer = viewer
    @project = project
  end

  def can_verify?
    return false if project.contact_name.nil?
    return true if oauth_name_contains_contact_name

    dif = Levenshtein.compare(project.contact_name, oauth_viewer.name)
    dif <= 2
  end

  def verify
    project.update(validation_status: "Validated")
    AttachImageJob.perform_later(project, oauth_viewer.image)
  end

  private

  def oauth_name_contains_contact_name
    return false unless oauth_viewer.name.include?(project.contact_first_name)
    return false unless oauth_viewer.name.include?(project.contact_last_name)

    true
  end
end
