# frozen_string_literal: true

class PopulateInterestArticlesJob < ApplicationJob
  queue_as :case_studies

  def perform(interest)
    interest.find_articles!
  end
end
