# frozen_string_literal: true

class AddAgreementToMessage < ActiveRecord::Migration[6.1]
  def change
    add_reference :messages, :agreement, foreign_key: true
  end
end
