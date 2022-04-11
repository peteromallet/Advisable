# frozen_string_literal: true

class AddShowcasedArticlesToAccount < ActiveRecord::Migration[7.0]
  def change
    add_column :accounts, :showcased_articles, :jsonb
  end
end
