# frozen_string_literal: true

module Guild
  class PostEngagement < ApplicationRecord
    belongs_to :specialist
    belongs_to :post, foreign_key: "guild_post_id", class_name: "Guild::Post", counter_cache: :engagements_count, inverse_of: "engagements"

    validates :specialist_id, uniqueness: {scope: :guild_post_id}
  end
end

# == Schema Information
#
# Table name: guild_post_engagements
#
#  id            :integer          not null, primary key
#  specialist_id :integer
#  guild_post_id :uuid
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# Indexes
#
#  index_guild_post_engagements_on_guild_post_id                    (guild_post_id)
#  index_guild_post_engagements_on_specialist_id                    (specialist_id)
#  index_guild_post_engagements_on_specialist_id_and_guild_post_id  (specialist_id,guild_post_id) UNIQUE
#
