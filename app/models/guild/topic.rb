module Guild
  # This is a light wrapper for `ActsAsTaggableOn::Tag` so that specialists
  #   can follow guild topics ( tags )
  #
  # Note the :alias_tag relation should be kept as is in case we rename this model
  #   to something like Guild::Tag or Guild::Category without a migration

  class Topic < ActsAsTaggableOn::Tag
    acts_as_followable

    belongs_to :alias_tag, class_name: "Guild::Topic", optional: true
    has_many :aliased_tags, class_name: "Guild::Topic", foreign_key: "alias_tag_id", dependent: :nullify, inverse_of: 'alias_tag'

    # Associated skills or industries
    belongs_to :topicable, polymorphic: true, optional: true

    validate :ensure_alias_root

    protected

    def ensure_alias_root
      if alias_tag&.alias_tag_id
        errors.add(:base, "Cannot alias another aliased topic")
      end
    end
  end
end

# == Schema Information
#
# Table name: tags
#
#  id             :uuid             not null, primary key
#  name           :string
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
#  index_tags_on_topicable_type_and_topicable_id  (topicable_type,topicable_id)
#
