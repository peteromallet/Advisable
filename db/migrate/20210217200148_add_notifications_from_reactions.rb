# frozen_string_literal: true

class AddNotificationsFromReactions < ActiveRecord::Migration[6.1]
  def up
    Guild::Reaction.order(:created_at).find_each { |r| r.create_notification!(read_at: Time.current) }
  end
end
