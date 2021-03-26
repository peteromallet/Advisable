# frozen_string_literal: true

class AddFeaturedDescriptionPromptPromptCtaToLabels < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      change_table :labels, bulk: true do |t|
        t.boolean :featured, default: false
        t.string :description
        t.string :prompt
        t.string :prompt_cta
      end
    end
  end
end
