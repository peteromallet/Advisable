module Guild
  class Comment < ApplicationRecord
    default_scope { order("created_at DESC") }
  
    belongs_to :user
    belongs_to :post, foreign_key: 'guild_post_id', class_name: 'Guild::Post', counter_cache: true
  
    # has_many :reactions, as: :reactionable
    # has_many :child_comments, class_name: "Comment", foreign_key: "parent_comment_id", dependent: :destroy
    # belongs_to :parent_comment, class_name: "Comment", optional: true
  
    enum status: {
      draft: 0,
      published: 1,
      removed: 2
    }
  end
end