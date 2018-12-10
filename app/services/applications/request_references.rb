class Applications::RequestReferences < ApplicationService
  attr_reader :application

  def initialize(application: )
    @application = application
  end

  def call
    application.references_requested = true
    if application.save
      airtable_record['References Requested'] = 'Yes'
      airtable_record.save
    end
    application
  end

  private

  def airtable_record
    @airtable_record ||= Airtable::Application.find(application.airtable_id)
  end

end