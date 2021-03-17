# frozen_string_literal: true

class AddPreviousProjectToApplicationReference < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      add_reference :application_references, :off_platform_project, foreign_key: true
    end
  end
end
