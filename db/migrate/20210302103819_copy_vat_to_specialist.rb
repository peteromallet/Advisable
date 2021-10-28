# frozen_string_literal: true

class CopyVatToSpecialist < ActiveRecord::Migration[6.1]
  class MigrationAccount < ActiveRecord::Base
    self.table_name = :accounts
  end

  class MigrationSpecialist < ActiveRecord::Base
    self.table_name = :specialists
  end

  def up
    vat_numbers = MigrationAccount.where.not(vat_number: ["", nil]).pluck(:id, :vat_number).to_h
    MigrationSpecialist.where(account_id: vat_numbers.keys).find_each do |specialist|
      specialist.update_columns(vat_number: vat_numbers[specialist.account_id])
    end
  end
end
