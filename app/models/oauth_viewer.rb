# frozen_string_literal: true

class OauthViewer
  attr_reader :uid, :name, :first_name, :last_name, :image, :provider

  def initialize(viewer_session_hash)
    @uid = viewer_session_hash.fetch("uid", nil)
    @provider = viewer_session_hash.fetch("provider", nil)
    @name = viewer_session_hash.fetch("name", nil)
    @first_name = viewer_session_hash.fetch("first_name", nil)
    @last_name = viewer_session_hash.fetch("last_name", nil)
    @image = viewer_session_hash.fetch("image", nil)
  end
end
