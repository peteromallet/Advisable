# frozen_string_literal: true

class CaseStudyImportJob < ApplicationJob
  queue_as :case_studies

  def perform(article)
    Airtable::CaseStudy.find(article.airtable_id).import!
    PositionArticleInInterestsJob.perform_later(article)
  end
end
