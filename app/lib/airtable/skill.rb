# frozen_string_literal: true

module Airtable
  class Skill < Airtable::Base
    self.table_name = "Skills"
    sync_with ::Skill

    def self.active
      all(view: "Selectable Skills", sort: {"Name" => "asc"}).reject do |s|
        s.fields["Name"].blank?
      end
    end

    def self.find_by_name(name)
      all(filter: "{Name} = '#{name}'").first
    end

    push_data { |skill| self["Name"] = skill.name }
  end
end
