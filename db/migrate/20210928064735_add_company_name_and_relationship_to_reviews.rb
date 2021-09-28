# frozen_string_literal: true

class AddCompanyNameAndRelationshipToReviews < ActiveRecord::Migration[6.1]
  def change
    add_column :reviews, :company_name, :string
    add_column :reviews, :relationship, :string
  end
end
