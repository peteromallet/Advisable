module Guild
  class Post::Opportunity < Post
    acts_as_ordered_taggable_on :guild_topics

    # jsonb_accessor :data,
    #   foo: [:string, default: "bar"]
  end
end

# == Schema Information
#
# Table name: guild_posts
#
#  id                 :uuid             not null, primary key
#  body               :text
#  comments_count     :integer          default(0), not null
#  data               :jsonb            not null
#  engagements_count  :integer          default(0)
#  reactionable_count :integer          default(0), not null
#  status             :integer          default("draft"), not null
#  title              :string
#  type               :string           default("Post"), not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  specialist_id      :bigint
#
# Indexes
#
#  index_guild_posts_on_data           (data) USING gin
#  index_guild_posts_on_specialist_id  (specialist_id)
#
# Foreign Keys
#
#  fk_rails_...  (specialist_id => specialists.id)
#
