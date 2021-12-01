# frozen_string_literal: true

class ProcessImageJob < ApplicationJob
  def perform(image, options)
    image.variant(options).process
  end
end
