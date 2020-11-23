module Advisatable
  module Resources
    class Application < BaseResource
      set_model ::Application
      column :specialist, Advisatable::Columns::BelongsTo, resource: Advisatable::Resources::Specialist, labelled_by: :account
      column :status, Advisatable::Columns::SingleSelect, options: []
      column :score, Advisatable::Columns::Number, percision: 2
    end
  end
end
