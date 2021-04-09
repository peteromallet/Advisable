# frozen_string_literal: true

class CreateCaseStudyCompanies < ActiveRecord::Migration[6.1]
  def change
    create_table :case_study_companies, id: :uuid do |t|
      t.string :name
      t.text :description
      t.string :website
      t.string :business_type

      t.timestamps
    end
  end
end
