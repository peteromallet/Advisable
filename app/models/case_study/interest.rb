# frozen_string_literal: true

module CaseStudy
  class Interest < ApplicationRecord
    include Uid
    uid_prefix "cst"
    has_logidze

    belongs_to :account

    validates :term, uniqueness: {case_sensitive: false, scope: :account_id} # rubocop:disable Rails/UniqueValidationWithoutIndex

    def articles
      find_articles! if article_ids.blank?
      Article.searchable.where(id: article_ids)
    end

    def find_articles!
      embeddings = Embedding.ordered_articles_for(term_vector).last(5)
      update!(article_ids: embeddings.pluck(:article_id), min_score: embeddings.first[:similarity])
    end

    def term_vector
      fetch_term_data!
      Vector.elements(term_data) if term_data.present?
    end

    private

    def fetch_term_data!
      return if term_data.present? || term.blank?

      query = [
        term,
        account.user&.company&.audience.presence
      ].compact.join(" for ")
      self.term_data = OpenAiInteractor.new.query_embedding_for(query)
      save!
    end
  end
end

# == Schema Information
#
# Table name: case_study_interests
#
#  id          :bigint           not null, primary key
#  article_ids :jsonb
#  min_score   :decimal(, )
#  term        :string
#  term_data   :jsonb
#  uid         :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  account_id  :bigint           not null
#
# Indexes
#
#  index_case_study_interests_on_account_id  (account_id)
#  index_case_study_interests_on_uid         (uid) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#
