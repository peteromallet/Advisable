# frozen_string_literal: true

class Labeling < ApplicationRecord
  belongs_to :label, counter_cache: true
  belongs_to :guild_post, class_name: "Guild::Post"

  validates :guild_post_id, uniqueness: {scope: :label_id}
end

# == Schema Information
#
# Table name: labelings
#
#  id            :uuid             not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  guild_post_id :uuid             not null
#  label_id      :uuid             not null
#
# Indexes
#
#  index_labelings_on_guild_post_id               (guild_post_id)
#  index_labelings_on_label_id                    (label_id)
#  index_labelings_on_label_id_and_guild_post_id  (label_id,guild_post_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (guild_post_id => guild_posts.id)
#  fk_rails_...  (label_id => labels.id)
#
