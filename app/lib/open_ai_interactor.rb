# frozen_string_literal: true

class OpenAiInteractor
  class OpenAiInteractorError < StandardError; end

  ENGINE = "babbage"

  attr_reader :client

  def initialize
    @client = OpenAI::Client.new
  end

  def embedding_for(input, type: "query")
    response = client.embeddings(
      engine: "text-search-#{ENGINE}-#{type}-001",
      parameters: {input:}
    )
    data = response.try(:[], "data")
    raise OpenAiInteractorError, "No data returned from OpenAI" if data.blank? || data[0].blank?

    data[0]["embedding"]
  end
end
