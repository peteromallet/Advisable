module Guild
  class Comment < ApplicationRecord
    default_scope { order("created_at DESC") }
  
    belongs_to :specialist
    belongs_to :post, foreign_key: 'guild_post_id', class_name: 'Guild::Post', counter_cache: true
    belongs_to :parent_comment, class_name: "Guild::Comment", optional: true
    has_many :child_comments, class_name: "Guild::Comment", foreign_key: "parent_comment_id", dependent: :destroy

    # reactions.create!(user: current_user, kind: Guild::Reaction.kinds["like"])
    has_many :reactions, as: :reactionable
  
    enum status: {
      draft: 0,
      published: 1,
      removed: 2
    }
  end
end