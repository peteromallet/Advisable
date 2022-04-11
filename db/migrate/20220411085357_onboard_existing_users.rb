# frozen_string_literal: true

class MigrationAccount < ActiveRecord::Base
  self.table_name = :accounts
  has_one :user, class_name: "MigrationUser", foreign_key: "account_id"
end

class MigrationUser < ActiveRecord::Base
  self.table_name = :users
  belongs_to :account, class_name: "MigrationAccount"
end

class MigrationSearch < ActiveRecord::Base
  self.table_name = :case_study_searches
end

class OnboardExistingUsers < ActiveRecord::Migration[7.0]
  def change
    user_ids = MigrationSearch.select(:user_id)
    MigrationAccount.joins(:user).where({user: {id: user_ids.distinct}}).find_each do |acc|
      acc.completed_tutorials += ["onboarding"]
      acc.save(touch: false)
    end
  end
end
