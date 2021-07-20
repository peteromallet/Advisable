# frozen_string_literal: true

class AddUidNullConstraint < ActiveRecord::Migration[6.1]
  def change
    validate_check_constraint :accounts, name: "is_uid_null"
    validate_check_constraint :answers, name: "is_uid_null"
    validate_check_constraint :application_references, name: "is_uid_null"
    validate_check_constraint :applications, name: "is_uid_null"
    validate_check_constraint :auth_providers, name: "is_uid_null"
    validate_check_constraint :case_study_shared_articles, name: "is_uid_null"
    validate_check_constraint :consultations, name: "is_uid_null"
    validate_check_constraint :countries, name: "is_uid_null"
    validate_check_constraint :guild_post_images, name: "is_uid_null"
    validate_check_constraint :industries, name: "is_uid_null"
    validate_check_constraint :interviews, name: "is_uid_null"
    validate_check_constraint :off_platform_projects, name: "is_uid_null"
    validate_check_constraint :payments, name: "is_uid_null"
    validate_check_constraint :payouts, name: "is_uid_null"
    validate_check_constraint :projects, name: "is_uid_null"
    validate_check_constraint :questions, name: "is_uid_null"
    validate_check_constraint :reviews, name: "is_uid_null"
    validate_check_constraint :sales_people, name: "is_uid_null"
    validate_check_constraint :skills, name: "is_uid_null"
    validate_check_constraint :specialists, name: "is_uid_null"
    validate_check_constraint :tasks, name: "is_uid_null"
    validate_check_constraint :users, name: "is_uid_null"
    validate_check_constraint :video_calls, name: "is_uid_null"

    change_column_null :accounts, :uid, false
    change_column_null :answers, :uid, false
    change_column_null :application_references, :uid, false
    change_column_null :applications, :uid, false
    change_column_null :auth_providers, :uid, false
    change_column_null :case_study_shared_articles, :uid, false
    change_column_null :consultations, :uid, false
    change_column_null :countries, :uid, false
    change_column_null :guild_post_images, :uid, false
    change_column_null :industries, :uid, false
    change_column_null :interviews, :uid, false
    change_column_null :off_platform_projects, :uid, false
    change_column_null :payments, :uid, false
    change_column_null :payouts, :uid, false
    change_column_null :projects, :uid, false
    change_column_null :questions, :uid, false
    change_column_null :reviews, :uid, false
    change_column_null :sales_people, :uid, false
    change_column_null :skills, :uid, false
    change_column_null :specialists, :uid, false
    change_column_null :tasks, :uid, false
    change_column_null :users, :uid, false
    change_column_null :video_calls, :uid, false

    remove_check_constraint :accounts, name: "is_uid_null"
    remove_check_constraint :answers, name: "is_uid_null"
    remove_check_constraint :application_references, name: "is_uid_null"
    remove_check_constraint :applications, name: "is_uid_null"
    remove_check_constraint :auth_providers, name: "is_uid_null"
    remove_check_constraint :case_study_shared_articles, name: "is_uid_null"
    remove_check_constraint :consultations, name: "is_uid_null"
    remove_check_constraint :countries, name: "is_uid_null"
    remove_check_constraint :guild_post_images, name: "is_uid_null"
    remove_check_constraint :industries, name: "is_uid_null"
    remove_check_constraint :interviews, name: "is_uid_null"
    remove_check_constraint :off_platform_projects, name: "is_uid_null"
    remove_check_constraint :payments, name: "is_uid_null"
    remove_check_constraint :payouts, name: "is_uid_null"
    remove_check_constraint :projects, name: "is_uid_null"
    remove_check_constraint :questions, name: "is_uid_null"
    remove_check_constraint :reviews, name: "is_uid_null"
    remove_check_constraint :sales_people, name: "is_uid_null"
    remove_check_constraint :skills, name: "is_uid_null"
    remove_check_constraint :specialists, name: "is_uid_null"
    remove_check_constraint :tasks, name: "is_uid_null"
    remove_check_constraint :users, name: "is_uid_null"
    remove_check_constraint :video_calls, name: "is_uid_null"
  end
end
