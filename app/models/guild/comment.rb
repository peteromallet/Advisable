module Guild
  class Comment < ApplicationRecord
    default_scope { order("created_at DESC") }

    belongs_to :specialist
    belongs_to :post, foreign_key: 'guild_post_id', class_name: 'Guild::Post', counter_cache: true
    belongs_to :parent_comment, class_name: "Guild::Comment", optional: true
    has_many :child_comments, class_name: "Guild::Comment", foreign_key: "parent_comment_id", dependent: :destroy

    # @guild_comment.reactions.create!(specialist: current_user, kind: Guild::Reaction.kinds["thanks"])
    has_many :reactions, as: :reactionable

    validates :body, length: {maximum: 2_500, minimum: 4}

    before_validation(on: :create) do
      self.post = parent_comment.post if parent_comment
      self.status = Comment.statuses["published"]
    end

    enum status: {
      draft: 0,
      published: 1,
      removed: 2
    }
  end
end

# == Schema Information
#
# Table name: guild_comments
#
#  id                 :uuid             not null, primary key
#  body               :text             not null
#  data               :jsonb
#  reactionable_count :integer          default(0), not null
#  status             :integer          default("draft"), not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  guild_post_id      :uuid
#  parent_comment_id  :uuid
#  specialist_id      :bigint
#
# Indexes
#
#  index_guild_comments_on_guild_post_id      (guild_post_id)
#  index_guild_comments_on_parent_comment_id  (parent_comment_id)
#  index_guild_comments_on_specialist_id      (specialist_id)
#
# Foreign Keys
#
#  fk_rails_...  (guild_post_id => guild_posts.id) ON DELETE => cascade
#  fk_rails_...  (specialist_id => specialists.id) ON DELETE => cascade
#
