# frozen_string_literal: true

module AdminHelper
  include Pagy::Frontend

  COLORS = {heading: :red, images: :fuchsia, links: :sky, paragraph: :indigo, podcast: :teal, results: :emerald}.freeze

  def content_form_params(content)
    if content.persisted?
      {url: admin_content_path(content), method: :patch}
    else
      {url: admin_contents_path}
    end
  end

  def color_for(content, editing: false)
    color = COLORS[content.class.name[/::(\w+)Content/, 1].downcase.to_sym]

    if editing
      "bg-#{color}-800 text-#{color}-100"
    else
      "bg-#{color}-100 text-#{color}-800"
    end
  end
end
