# frozen_string_literal: true

class CopyVatToSpecialist < ActiveRecord::Migration[6.1]
  def up
    vat_numbers = Account.pluck(:id, :vat_number).to_h
    Specialist.find_each do |specialist|
      specialist.update_columns(vat_number: vat_numbers[specialist.account_id]) # rubocop:disable Rails/SkipsModelValidations
    end
  end
end
