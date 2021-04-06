# frozen_string_literal: true

class AddGuildDataFieldsToSpecialist < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      change_table :specialists, bulk: true do |t|
        t.datetime :guild_joined_date
        t.datetime :guild_featured_member_at
        t.string :guild_calendly_link
      end
    end
  end
end
