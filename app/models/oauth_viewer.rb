class OauthViewer
  attr_reader :uid, :name, :first_name, :image, :provider

  def initialize(viewer_session_hash)
    @uid = viewer_session_hash.fetch('uid', nil)
    @provider = viewer_session_hash.fetch('provider', nil)
    @name = viewer_session_hash.fetch('name', nil)
    @first_name = viewer_session_hash.fetch('first_name', nil)
    @image = viewer_session_hash.fetch('image', nil)
  end

  def can_validate_project?(project)
    return false if project.contact_name.nil?
    dif = Levenshtein.compare(project.contact_name, name)
    return true if dif <= 1
    false
  end
end
