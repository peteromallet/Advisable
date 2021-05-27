# frozen_string_literal: true

class AddFeedbackToCompanies < ActiveRecord::Migration[6.1]
  def change
    add_column(:companies, :feedback, :boolean)
  end
end
