# frozen_string_literal: true
module Guild
  class Reaction < ApplicationRecord
    belongs_to :reactionable, polymorphic: true, counter_cache: :reactionable_count
    belongs_to :user
    
    # @guild_post.reactions.create!(user: current_user, kind: Guild::Reaction.kinds["like"])
    # @guild_post.reactions.find_by(user: current_user, kind: Guild::Reaction.kinds["like"]).destroy
    enum kind: {
      like: 0
      # ...
    }

    validates :user, uniqueness: {
      scope: %i[reactionable_type reactionable_id],
      message: "has already created a reaction for reactionable_type"
    }
  end
end