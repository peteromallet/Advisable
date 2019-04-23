require 'rails_helper'

describe Task do
  include_examples "uid"
  include_examples "Airtable::Syncable"
end
