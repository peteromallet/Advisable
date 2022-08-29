# frozen_string_literal: true

module Airtable
  class Industry < Airtable::Base
    self.table_name = "Industries"
    sync_with ::Industry
  end
end
