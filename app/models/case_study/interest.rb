# frozen_string_literal: true

module CaseStudy
  class Interest < ApplicationRecord
    include Uid
    uid_prefix "cst"
    has_logidze

    belongs_to :account
    has_many :interest_articles, dependent: :destroy

    validates :term, uniqueness: {case_sensitive: false, scope: :account_id}

    def articles
      find_articles! if interest_articles.none?
      Article.where(id: interest_articles.select(:article_id))
    end

    def find_articles!
      interest_articles.insert_all!(Embedding.ordered_articles_for(term_vector).last(5)) # rubocop:disable Rails/SkipsModelValidations
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
#  id         :bigint           not null, primary key
#  term       :citext
#  term_data  :jsonb
#  uid        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  account_id :bigint           not null
#
# Indexes
#
#  index_case_study_interests_on_account_id           (account_id)
#  index_case_study_interests_on_term_and_account_id  (term,account_id) UNIQUE
#  index_case_study_interests_on_uid                  (uid) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#
