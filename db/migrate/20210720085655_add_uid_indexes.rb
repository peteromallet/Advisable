# frozen_string_literal: true

class AddUidIndexes < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_index :application_references, :uid
      remove_index :applications, :uid
      remove_index :case_study_articles, :uid
      remove_index :case_study_companies, :uid
      remove_index :case_study_contents, :uid
      remove_index :case_study_industries, :uid
      remove_index :case_study_searches, :uid
      remove_index :case_study_sections, :uid
      remove_index :case_study_skills, :uid
      remove_index :consultations, :uid
      remove_index :guild_post_images, :uid
      remove_index :industries, :uid
      remove_index :skills, :uid
      remove_index :specialists, :uid
      remove_index :tasks, :uid
      remove_index :users, :uid
      remove_index :video_calls, :uid

      add_index :answers, :uid, unique: true
      add_index :application_references, :uid, unique: true
      add_index :applications, :uid, unique: true
      add_index :case_study_articles, :uid, unique: true
      add_index :case_study_companies, :uid, unique: true
      add_index :case_study_contents, :uid, unique: true
      add_index :case_study_industries, :uid, unique: true
      add_index :case_study_searches, :uid, unique: true
      add_index :case_study_sections, :uid, unique: true
      add_index :case_study_shared_articles, :uid, unique: true
      add_index :case_study_skills, :uid, unique: true
      add_index :consultations, :uid, unique: true
      add_index :countries, :uid, unique: true
      add_index :events, :uid, unique: true
      add_index :guild_post_images, :uid, unique: true
      add_index :industries, :uid, unique: true
      add_index :interviews, :uid, unique: true
      add_index :off_platform_projects, :uid, unique: true
      add_index :payments, :uid, unique: true
      add_index :payouts, :uid, unique: true
      add_index :projects, :uid, unique: true
      add_index :questions, :uid, unique: true
      add_index :reviews, :uid, unique: true
      add_index :sales_people, :uid, unique: true
      add_index :skills, :uid, unique: true
      add_index :specialists, :uid, unique: true
      add_index :tasks, :uid, unique: true
      add_index :users, :uid, unique: true
      add_index :video_calls, :uid, unique: true
    end
  end
end
