require "rails_helper"

describe Airtable::Specialist do
  include_examples "sync airtable association", "Country", to: :country
end