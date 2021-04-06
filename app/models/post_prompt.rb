# frozen_string_literal: true

class PostPrompt < ApplicationRecord
  belongs_to :label
  has_many :guild_posts, class_name: "Guild::Post", dependent: :nullify

  delegate :description, to: :label

  scope :featured, -> { where(featured: true) }

  validates :prompt, :prompt_cta, presence: true
  before_save :reset_previous_featured, if: :featured_changed?

  private

  def reset_previous_featured
    return unless featured

    # rubocop:disable Rails/SkipsModelValidations
    PostPrompt.featured.update_all(featured: false)
    # rubocop:enable Rails/SkipsModelValidations
  end
end

# == Schema Information
#
# Table name: post_prompts
#
#  id                :uuid             not null, primary key
#  cta               :string
#  featured          :boolean          default(FALSE)
#  guild_posts_count :integer          default(0)
#  prompt            :text
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  label_id          :uuid
#
# Indexes
#
#  index_post_prompts_on_label_id  (label_id)
#
# Foreign Keys
#
#  fk_rails_...  (label_id => labels.id)
#
