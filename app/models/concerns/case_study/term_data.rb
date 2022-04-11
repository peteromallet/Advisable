# frozen_string_literal: true

module CaseStudy
  module TermData
    def articles_by_relevancy
      Embedding.ordered_articles_for(term_vector)
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
