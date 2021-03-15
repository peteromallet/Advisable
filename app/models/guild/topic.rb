# frozen_string_literal: true

module Guild
  # This is a light wrapper for `ActsAsTaggableOn::Tag` so that specialists
  #   can follow guild topics ( tags )
  #
  # Note the :alias_tag relation should be kept as is in case we rename this model
  #   to something like Guild::Tag or Guild::Category without a migration

  class Topic < ActsAsTaggableOn::Tag
    include Sluggable

    slug_from :name

    belongs_to :topicable, polymorphic: true, optional: true
    belongs_to :alias_tag, class_name: "Guild::Topic", optional: true
    has_many :aliased_tags, class_name: "Guild::Topic", foreign_key: "alias_tag_id", dependent: :nullify, inverse_of: 'alias_tag'
    has_many :subscriptions, foreign_key: :tag_id, inverse_of: :tag, dependent: :destroy

    validate :ensure_alias_root

    scope :published, -> { where(published: true) }
    scope :other, lambda {
      where(topicable_id: nil).
        published.
        order(taggings_count: :desc)
    }

    protected

    def ensure_alias_root
      errors.add(:base, "Cannot alias another aliased topic") if alias_tag&.alias_tag_id
    end
  end
end

# == Schema Information
#
# Table name: tags
#
#  id             :uuid             not null, primary key
#  name           :string
#  published      :boolean          default(FALSE)
#  slug           :string
#  taggings_count :integer          default(0)
#  topicable_type :string
#  created_at     :datetime
#  updated_at     :datetime
#  alias_tag_id   :integer
#  topicable_id   :bigint
#
# Indexes
#
#  index_tags_on_name                             (name) UNIQUE
#  index_tags_on_slug                             (slug) UNIQUE
#  index_tags_on_topicable_type_and_topicable_id  (topicable_type,topicable_id)
#
