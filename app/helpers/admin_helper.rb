# frozen_string_literal: true

module AdminHelper
  include Pagy::Frontend

  def content_form_params(content)
    if content.persisted?
      {url: admin_content_path(content), method: :patch}
    else
      {url: admin_contents_path}
    end
  end
end
