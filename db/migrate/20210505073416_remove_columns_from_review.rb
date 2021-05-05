# frozen_string_literal: true

class RemoveColumnsFromReview < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_column :reviews, :type, :string
      remove_column :reviews, :project_type, :string
      remove_column :reviews, :reviewable_type, :string
      remove_column :reviews, :reviewable_id, :bigint
    end
  end
end
