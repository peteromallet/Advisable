# frozen_string_literal: true

class UidCheckConstraint < ActiveRecord::Migration[6.1]
  def change
    add_check_constraint :accounts, "uid IS NOT NULL", name: "is_uid_null", validate: false
    add_check_constraint :answers, "uid IS NOT NULL", name: "is_uid_null", validate: false
    add_check_constraint :application_references, "uid IS NOT NULL", name: "is_uid_null", validate: false
    add_check_constraint :applications, "uid IS NOT NULL", name: "is_uid_null", validate: false
    add_check_constraint :auth_providers, "uid IS NOT NULL", name: "is_uid_null", validate: false
    add_check_constraint :case_study_shared_articles, "uid IS NOT NULL", name: "is_uid_null", validate: false
    add_check_constraint :consultations, "uid IS NOT NULL", name: "is_uid_null", validate: false
    add_check_constraint :countries, "uid IS NOT NULL", name: "is_uid_null", validate: false
    add_check_constraint :guild_post_images, "uid IS NOT NULL", name: "is_uid_null", validate: false
    add_check_constraint :industries, "uid IS NOT NULL", name: "is_uid_null", validate: false
    add_check_constraint :interviews, "uid IS NOT NULL", name: "is_uid_null", validate: false
    add_check_constraint :off_platform_projects, "uid IS NOT NULL", name: "is_uid_null", validate: false
    add_check_constraint :payments, "uid IS NOT NULL", name: "is_uid_null", validate: false
    add_check_constraint :payouts, "uid IS NOT NULL", name: "is_uid_null", validate: false
    add_check_constraint :projects, "uid IS NOT NULL", name: "is_uid_null", validate: false
    add_check_constraint :questions, "uid IS NOT NULL", name: "is_uid_null", validate: false
    add_check_constraint :reviews, "uid IS NOT NULL", name: "is_uid_null", validate: false
    add_check_constraint :sales_people, "uid IS NOT NULL", name: "is_uid_null", validate: false
    add_check_constraint :skills, "uid IS NOT NULL", name: "is_uid_null", validate: false
    add_check_constraint :specialists, "uid IS NOT NULL", name: "is_uid_null", validate: false
    add_check_constraint :tasks, "uid IS NOT NULL", name: "is_uid_null", validate: false
    add_check_constraint :users, "uid IS NOT NULL", name: "is_uid_null", validate: false
    add_check_constraint :video_calls, "uid IS NOT NULL", name: "is_uid_null", validate: false
  end
end
