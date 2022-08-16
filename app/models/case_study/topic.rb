# frozen_string_literal: true

module CaseStudy
  class Topic < ApplicationRecord
    include Sluggable
    slug_from :name
    include Uid
    uid_prefix "cst"

    has_one_attached :icon

    validates :name, presence: true

    scope :internal, -> { where(hidden: [false, nil]) }
    scope :by_position, -> { order("position ASC NULLS LAST") }

    def result_ids
      super.presence || []
    end

    def results
      Article.where(id: result_ids).in_order_of(:id, result_ids)
    end

    def move_to!(position)
      ids_by_position = self.class.by_position.where.not(id:).pluck(:id)
      ids_by_position.insert(position - 1, id)
      ActiveRecord::Base.connection.execute("UPDATE case_study_topics SET position = array_position(array[#{ids_by_position.join(',')}]::bigint[], id)")
    end

    def move_result_to!(result, position)
      ids = result_ids.without(result)
      ids.insert(position - 1, result)
      update!(result_ids: ids.compact)
    end
  end
end

# == Schema Information
#
# Table name: case_study_topics
#
#  id          :bigint           not null, primary key
#  description :text
#  hidden      :boolean
#  name        :string
#  position    :integer
#  result_ids  :jsonb
#  slug        :string           not null
#  uid         :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_case_study_topics_on_slug  (slug) UNIQUE
#  index_case_study_topics_on_uid   (uid) UNIQUE
#
