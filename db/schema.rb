# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_03_11_114658) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "application_references", force: :cascade do |t|
    t.string "uid"
    t.bigint "application_id"
    t.string "project_type"
    t.bigint "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["application_id"], name: "index_application_references_on_application_id"
    t.index ["project_type", "project_id"], name: "index_application_references_on_project_type_and_project_id"
    t.index ["uid"], name: "index_application_references_on_uid"
  end

  create_table "application_rejection_reasons", force: :cascade do |t|
    t.string "reason"
    t.string "airtable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["airtable_id"], name: "index_application_rejection_reasons_on_airtable_id"
  end

  create_table "applications", force: :cascade do |t|
    t.integer "rate"
    t.string "availability"
    t.string "status"
    t.text "introduction"
    t.jsonb "questions"
    t.decimal "score"
    t.bigint "specialist_id"
    t.bigint "project_id"
    t.string "airtable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "rejection_reason_id"
    t.boolean "accepts_fee"
    t.boolean "accepts_terms"
    t.boolean "featured", default: false
    t.string "comment"
    t.text "rejection_reason"
    t.text "rejection_reason_comment"
    t.boolean "references_requested"
    t.string "invitation_rejection_reason"
    t.string "referral_url"
    t.datetime "applied_at"
    t.index ["project_id"], name: "index_applications_on_project_id"
    t.index ["rejection_reason_id"], name: "index_applications_on_rejection_reason_id"
    t.index ["specialist_id"], name: "index_applications_on_specialist_id"
  end

  create_table "booking_rejection_reasons", force: :cascade do |t|
    t.string "name"
    t.string "airtable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["airtable_id"], name: "index_booking_rejection_reasons_on_airtable_id"
  end

  create_table "bookings", force: :cascade do |t|
    t.string "type"
    t.decimal "rate"
    t.string "rate_type"
    t.decimal "rate_limit"
    t.string "status"
    t.string "duration"
    t.jsonb "deliverables"
    t.string "airtable_id"
    t.bigint "application_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "decline_comment"
    t.bigint "rejection_reason_id"
    t.date "start_date"
    t.date "end_date"
    t.string "proposal_comment"
    t.string "client_decline_comment"
    t.index ["airtable_id"], name: "index_bookings_on_airtable_id"
    t.index ["application_id"], name: "index_bookings_on_application_id"
    t.index ["rejection_reason_id"], name: "index_bookings_on_rejection_reason_id"
  end

  create_table "client_users", force: :cascade do |t|
    t.bigint "client_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_client_users_on_client_id"
    t.index ["user_id"], name: "index_client_users_on_user_id"
  end

  create_table "clients", force: :cascade do |t|
    t.string "name"
    t.string "airtable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["airtable_id"], name: "index_clients_on_airtable_id"
  end

  create_table "countries", force: :cascade do |t|
    t.string "name"
    t.string "currency"
    t.string "airtable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "uid"
  end

  create_table "industries", force: :cascade do |t|
    t.string "name"
    t.string "uid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["uid"], name: "index_industries_on_uid"
  end

  create_table "interviews", force: :cascade do |t|
    t.bigint "application_id"
    t.datetime "starts_at"
    t.string "status"
    t.string "time_zone"
    t.string "airtable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["airtable_id"], name: "index_interviews_on_airtable_id"
    t.index ["application_id"], name: "index_interviews_on_application_id"
    t.index ["user_id"], name: "index_interviews_on_user_id"
  end

  create_table "off_platform_projects", force: :cascade do |t|
    t.string "airtable_id"
    t.bigint "specialist_id"
    t.string "industry"
    t.string "contact_first_name"
    t.string "contact_last_name"
    t.string "contact_job_title"
    t.string "client_name"
    t.text "client_description"
    t.text "description"
    t.text "requirements"
    t.text "results"
    t.string "primary_skill"
    t.boolean "confidential", default: false
    t.boolean "validated", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "can_contact"
    t.string "validation_url"
    t.string "contact_email"
    t.string "validation_method"
    t.string "validation_status"
    t.boolean "validated_by_client"
    t.index ["airtable_id"], name: "index_off_platform_projects_on_airtable_id"
    t.index ["specialist_id"], name: "index_off_platform_projects_on_specialist_id"
  end

  create_table "payments", force: :cascade do |t|
    t.string "uid"
    t.string "source_id"
    t.string "charge_id"
    t.integer "amount"
    t.string "currency"
    t.string "status"
    t.string "error_code"
    t.bigint "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["charge_id"], name: "index_payments_on_charge_id"
    t.index ["project_id"], name: "index_payments_on_project_id"
    t.index ["source_id"], name: "index_payments_on_source_id"
    t.index ["uid"], name: "index_payments_on_uid"
  end

  create_table "project_skills", force: :cascade do |t|
    t.bigint "skill_id"
    t.string "project_type"
    t.bigint "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_type", "project_id"], name: "index_project_skills_on_project_type_and_project_id"
    t.index ["skill_id"], name: "index_project_skills_on_skill_id"
  end

  create_table "projects", force: :cascade do |t|
    t.string "name"
    t.string "airtable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "currency"
    t.bigint "client_id"
    t.string "client_referral_url"
    t.text "company_description"
    t.text "description"
    t.text "specialist_description"
    t.text "goals", default: [], array: true
    t.text "questions", default: [], array: true
    t.text "required_characteristics", default: [], array: true
    t.text "optional_characteristics", default: [], array: true
    t.datetime "accepted_terms_at"
    t.integer "deposit"
    t.string "status"
    t.integer "deposit_paid"
    t.bigint "user_id"
    t.string "primary_skill"
    t.string "service_type"
    t.string "estimated_budget"
    t.boolean "remote"
    t.string "sales_status"
    t.index ["client_id"], name: "index_projects_on_client_id"
    t.index ["user_id"], name: "index_projects_on_user_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.string "airtable_id"
    t.string "type"
    t.bigint "specialist_id"
    t.string "project_type"
    t.bigint "project_id"
    t.string "reviewable_type"
    t.bigint "reviewable_id"
    t.text "comment"
    t.jsonb "ratings"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["airtable_id"], name: "index_reviews_on_airtable_id"
    t.index ["project_type", "project_id"], name: "index_reviews_on_project_type_and_project_id"
    t.index ["reviewable_type", "reviewable_id"], name: "index_reviews_on_reviewable_type_and_reviewable_id"
    t.index ["specialist_id"], name: "index_reviews_on_specialist_id"
  end

  create_table "skills", force: :cascade do |t|
    t.string "name"
    t.string "airtable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "category"
    t.boolean "profile"
    t.string "uid"
  end

  create_table "specialist_skills", force: :cascade do |t|
    t.bigint "specialist_id"
    t.bigint "skill_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["skill_id"], name: "index_specialist_skills_on_skill_id"
    t.index ["specialist_id"], name: "index_specialist_skills_on_specialist_id"
  end

  create_table "specialists", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.jsonb "image"
    t.string "linkedin"
    t.string "travel_availability"
    t.string "city"
    t.bigint "country_id"
    t.string "airtable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "encrypted_phone_number"
    t.string "encrypted_phone_number_iv"
    t.jsonb "ratings", default: {}
    t.integer "reviews_count"
    t.text "bio"
    t.string "uid"
    t.string "email"
    t.string "password_digest"
    t.datetime "confirmed_at"
    t.string "confirmation_digest"
    t.datetime "reset_sent_at"
    t.string "reset_digest"
    t.text "permissions", default: [], array: true
    t.boolean "remote"
    t.index ["country_id"], name: "index_specialists_on_country_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "airtable_id"
    t.text "availability"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "company_name"
    t.string "password_digest"
    t.string "email"
    t.string "uid"
    t.datetime "confirmed_at"
    t.string "confirmation_digest"
    t.bigint "country_id"
    t.string "reset_digest"
    t.datetime "reset_sent_at"
    t.text "permissions", default: [], array: true
    t.string "title"
    t.index ["airtable_id"], name: "index_users_on_airtable_id"
    t.index ["country_id"], name: "index_users_on_country_id"
  end

  create_table "webhook_configurations", force: :cascade do |t|
    t.string "name"
    t.string "url"
    t.string "type"
    t.jsonb "criteria"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "webhook_events", force: :cascade do |t|
    t.string "name"
    t.string "event"
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "webhooks", force: :cascade do |t|
    t.string "url"
    t.string "status"
    t.jsonb "data"
    t.text "response"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "application_references", "applications"
  add_foreign_key "applications", "application_rejection_reasons", column: "rejection_reason_id"
  add_foreign_key "applications", "projects"
  add_foreign_key "applications", "specialists"
  add_foreign_key "bookings", "applications"
  add_foreign_key "client_users", "clients"
  add_foreign_key "client_users", "users"
  add_foreign_key "interviews", "applications"
  add_foreign_key "interviews", "users"
  add_foreign_key "off_platform_projects", "specialists"
  add_foreign_key "payments", "projects"
  add_foreign_key "project_skills", "skills"
  add_foreign_key "projects", "clients"
  add_foreign_key "projects", "users"
  add_foreign_key "reviews", "specialists"
  add_foreign_key "specialist_skills", "skills"
  add_foreign_key "specialist_skills", "specialists"
  add_foreign_key "specialists", "countries"
  add_foreign_key "users", "countries"
end
