# frozen_string_literal: true

class CreateCaseStudyCompanies < ActiveRecord::Migration[6.1]
  def change
    create_table :case_study_companies do |t|
      t.string :uid, null: false, index: true
      t.string :name
      t.text :description
      t.string :website
      t.string :business_type

      t.timestamps
    end
  end
end
