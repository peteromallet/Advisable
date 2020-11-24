module Advisatable
  module Resources
    class Skill < BaseResource
      set_model ::Skill
      column :name, Advisatable::Columns::String
    end
  end
end
