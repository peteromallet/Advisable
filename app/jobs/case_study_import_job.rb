# frozen_string_literal: true

class CaseStudyImportJob < ApplicationJob
  queue_as :default

  def perform(airtable_id)
    Airtable::CaseStudy.find(airtable_id).import!
  end
end
