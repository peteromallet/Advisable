# frozen_string_literal: true

class OpenAiInteractor
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
    response["data"].first["embedding"]
  end
end
