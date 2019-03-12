require "rails_helper"

describe Airtable::SpecialistReview do
  include_examples 'airtable syncing'
  include_examples "sync airtable column", "Comment", to: :comment
  include_examples "sync airtable column", "Type", to: :type
  include_examples "sync airtable association", "Specialist", to: :specialist
end