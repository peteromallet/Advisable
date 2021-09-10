# frozen_string_literal: true

class AddSortingToTobyViews < ActiveRecord::Migration[6.1]
  def change
    add_column :toby_views, :sort_by, :string
    add_column :toby_views, :sort_order, :string
  end
end
