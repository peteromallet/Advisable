# frozen_string_literal: true

class MakeAuthorOptional < ActiveRecord::Migration[6.1]
  def change
    change_column_null :messages, :author_id, true
  end
end
