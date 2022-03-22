# frozen_string_literal: true

module CaseStudy
  class Interest < ApplicationRecord
    include Uid
    uid_prefix "cst"
    has_logidze

    belongs_to :account

    def articles
      Article.searchable.where(id: results)
    end

    def load_results!
      query = client.embeddings(engine: "text-search-#{Embedding::ENGINE}-query-001", parameters: {input: term})
      data = query["data"].first["embedding"]
      query_vector = Vector.elements(data)
      results = []
      Embedding.joins(:article).merge(Article.searchable).find_each do |embedding|
        results << {
          similarity: (embedding.cosine_similarity_to(query_vector) * 100).round(3),
          article_id: embedding.article_id
        }
      end
      results = results.sort_by { |r| r[:similarity] }.last(5).pluck(:article_id)
      update!(results:)
    end

    private

    def client
      @client ||= OpenAI::Client.new
    end
  end
end

# == Schema Information
#
# Table name: case_study_interests
#
#  id         :bigint           not null, primary key
#  results    :jsonb
#  term       :string
#  uid        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  account_id :bigint           not null
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
