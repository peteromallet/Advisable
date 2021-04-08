# frozen_string_literal: true

module CaseStudy
  class Content < ApplicationRecord
    belongs_to :article

    enum type: {Paragraph: 0, ImageGrid: 1, SectionHeading: 2}
  end
end

# == Schema Information
#
# Table name: case_study_contents
#
#  id         :uuid             not null, primary key
#  content    :jsonb
#  position   :integer
#  type       :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  article_id :uuid             not null
#
# Indexes
#
#  index_case_study_contents_on_article_id  (article_id)
#
# Foreign Keys
#
#  fk_rails_...  (article_id => case_study_articles.id)
#
