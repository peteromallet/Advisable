# frozen_string_literal: true

module Airtable
  class Skill < Airtable::Base
    self.table_name = "Skills"
    sync_with ::Skill

    push_data { |skill| self["Name"] = skill.name }
  end
end
