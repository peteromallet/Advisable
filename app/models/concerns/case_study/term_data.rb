# frozen_string_literal: true

module CaseStudy
  module TermData
    MIN_RESULTS = 5
    MAX_RESULTS = 10
    SIMILARITY_THRESHOLD = 0.3

    def articles_for_interest
      results = articles_by_relevancy.
        select { |a| a[:similarity] > SIMILARITY_THRESHOLD }.
        first(MAX_RESULTS)

      if results.size < MIN_RESULTS
        articles_by_relevancy.first(MIN_RESULTS)
      else
        results
      end
    end

    def articles_by_relevancy
      @articles_by_relevancy ||= Embedding.ordered_articles_for(term_vector)
    end

    def term_vector
      fetch_term_data!
      Vector.elements(term_data) if term_data.present?
    end

    private

    def fetch_term_data!
      return if term_data.present? || term.blank?

      self.term_data = OpenAiInteractor.new.query_embedding_for(term)
      save!
    end
  end
end
