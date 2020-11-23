module Advisatable
  module Columns
    def self.column_classes
      @column_classes ||= (Advisatable::Columns.constants - [:Base]).map do |klass|
        "Advisatable::Columns::#{klass}".constantize
      end
    end
  end
end
