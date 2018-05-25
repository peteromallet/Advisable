module Airtable
  def self.sync
    Rails.application.eager_load!
    Airtable::Base.descendants.each do |table|
      table.sync
    end
  end
end
