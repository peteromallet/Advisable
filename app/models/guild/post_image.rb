module Guild
  class PostImage < ApplicationRecord
    include Uid
    uid_prefix 'gpi'

    belongs_to :post,
               class_name: 'Guild::Post',
               foreign_key: 'guild_post_id',
               inverse_of: 'images'
    has_one_attached :image

    after_destroy :set_first_to_cover, if: :cover
    after_destroy :reduce_positions

    private

    def reduce_positions
      post.images.where('position > ?', position).find_each do |image|
        image.update position: image.position - 1
      end
    end

    def set_first_to_cover
      post.images.order(position: :asc).first.try(
        :update,
        cover: true
      )
    end
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
