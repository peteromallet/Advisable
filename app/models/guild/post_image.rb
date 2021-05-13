# frozen_string_literal: true

module Guild
  class PostImage < ApplicationRecord
    include Resizable
    include Uid
    uid_prefix 'gpi'

    has_one_attached :image
    resize image: {resize_to_limit: [1600, 1600]}
  end
end

# == Schema Information
#
# Table name: guild_post_images
#
#  id            :bigint           not null, primary key
#  cover         :boolean
#  position      :integer
#  string        :string
#  uid           :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  guild_post_id :uuid
#
# Indexes
#
#  index_guild_post_images_on_guild_post_id  (guild_post_id)
#  index_guild_post_images_on_string         (string)
#  index_guild_post_images_on_uid            (uid)
#
# Foreign Keys
#
#  fk_rails_...  (guild_post_id => guild_posts.id) ON DELETE => cascade
#
