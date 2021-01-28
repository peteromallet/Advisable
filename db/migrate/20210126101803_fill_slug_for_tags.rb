# frozen_string_literal: true

class FillSlugForTags < ActiveRecord::Migration[6.1]
  def up
    Guild::Topic.find_each(&:save)
  end
end
