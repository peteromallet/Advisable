# frozen_string_literal: true

module Guild
  class AdviceRequired < Post
  end
end

# == Schema Information
#
# Table name: guild_posts
#
#  id                :uuid             not null, primary key
#  type              :string           default("Post"), not null
#  body              :text
#  title             :string
#  status            :integer          default("0"), not null
#  specialist_id     :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  engagements_count :integer          default("0")
#  shareable         :boolean          default("false")
#  pinned            :boolean          default("false")
#  boosted_at        :datetime
#  resolved_at       :datetime
#  audience_type     :string
#  article_id        :integer
#
# Indexes
#
#  index_guild_posts_on_article_id      (article_id)
#  index_guild_posts_on_post_prompt_id  (post_prompt_id)
#  index_guild_posts_on_specialist_id   (specialist_id)
#
