# frozen_string_literal: true

class OpenAiInteractor
  class OpenAiInteractorError < StandardError; end

  attr_reader :client

  def initialize
    @client = OpenAI::Client.new
  end

  def document_embedding_for(text)
    embedding_for("text-search-babbage-doc-001", text)
  end

  def query_embedding_for(text)
    embedding_for("text-search-babbage-query-001", text)
  end

  private

  def embedding_for(engine, input)
    response = client.embeddings(engine:, parameters: {input:})
    error = response.try(:[], "error")
    raise OpenAiInteractorError, error["message"] if error.present? && error["message"].present?

    data = response.try(:[], "data")
    raise OpenAiInteractorError, "No data returned from OpenAI" if data.blank? || data[0].blank?

    data[0]["embedding"]
  end
end
