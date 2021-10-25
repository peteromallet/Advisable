# frozen_string_literal: true

class MigrateTutorialNaming < ActiveRecord::Migration[6.1]
  MAPPING = {
    "GUILD" => "guild",
    "fixedProjects" => "fixed_projects",
    "flexibleProjects" => "flexible_projects",
    "RECOMMENDATIONS" => "recommendations"
  }.freeze

  class MigrationAccount < ActiveRecord::Base
    self.table_name = :accounts
  end

  def up
    MigrationAccount.where.not(completed_tutorials: [nil, []]).find_each do |acc|
      acc.update_columns(
        completed_tutorials: acc.completed_tutorials.map { |t| MAPPING[t] }
      )
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
