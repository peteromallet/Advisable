# frozen_string_literal: true

module Guild
  class Post < ApplicationRecord
    self.store_full_sti_class = false

    has_many :comments, -> { published }, foreign_key: 'guild_post_id', class_name: 'Guild::Comment'
    # has_many :parent_comments, -> { where(parent_comment_id: nil).published }, class_name: "Comment"
    # has_many :reactions, as: :reactionable
    # has_many :mentionables, through: :comments, source: :user
    belongs_to :user

    enum status: {
      draft: 0,
      published: 1,
      removed: 2
    }

    validates :title, :body, :body_raw, :type, :status, presence: true
    validates :title, length: {maximum: 250,  minimum: 4}
    validates :body, length: {maximum: 10_000, minimum: 4}

    before_validation(on: :create) do
      self.status = Post.statuses["published"]
    end

    after_validation :set_audience

    # General, Opportunity, Advice Required, Case Study 
    def normalized_type
      case type
      when "Post"
        "General"
      else
        type.demodulize.titleize
      end
    end

    protected
    def set_audience
      # TODO ....
    end
  
  end
end