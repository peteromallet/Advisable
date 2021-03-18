# frozen_string_literal: true

class RemoveProjectFromApplicationReference < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_reference :application_references, :project, polymorphic: true
    end
  end
end
