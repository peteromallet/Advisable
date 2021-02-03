# frozen_string_literal: true

class CopySalesPersonToCompany < ActiveRecord::Migration[6.1]
  def up
    Company.all.find_each do |company|
      company.update_columns(sales_person_id: company.users&.first&.sales_person_id) # rubocop:disable Rails/SkipsModelValidations
    end
  end

  def down; end
end
