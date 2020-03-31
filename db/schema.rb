# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_03_31_065550) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

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
    t.decimal "rate"
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
    t.boolean "hidden"
    t.string "proposal_comment"
    t.string "project_type"
    t.integer "monthly_limit"
    t.string "uid"
    t.string "stopped_working_reason"
    t.boolean "trial_program"
    t.datetime "invited_to_apply_at"
    t.datetime "invitation_rejected_at"
    t.datetime "application_rejected_at"
    t.datetime "application_accepted_at"
    t.datetime "interview_scheduled_at"
    t.datetime "interview_completed_at"
    t.datetime "proposal_sent_at"
    t.datetime "started_working_at"
    t.datetime "stopped_working_at"
    t.string "billing_cycle"
    t.boolean "auto_apply"
    t.boolean "hide_from_profile"
    t.index ["project_id"], name: "index_applications_on_project_id"
    t.index ["rejection_reason_id"], name: "index_applications_on_rejection_reason_id"
    t.index ["specialist_id"], name: "index_applications_on_specialist_id"
  end

  create_table "blacklisted_domains", force: :cascade do |t|
    t.string "domain"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
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

  create_table "client_calls", force: :cascade do |t|
    t.string "airtable_id"
    t.integer "duration"
    t.bigint "project_id"
    t.datetime "call_time"
    t.string "phone_number"
    t.string "email"
    t.string "event_type"
    t.string "calendly_id"
    t.boolean "cancelled"
    t.bigint "sales_person_id"
    t.string "type_of_call"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["airtable_id"], name: "index_client_calls_on_airtable_id"
    t.index ["project_id"], name: "index_client_calls_on_project_id"
    t.index ["sales_person_id"], name: "index_client_calls_on_sales_person_id"
    t.index ["user_id"], name: "index_client_calls_on_user_id"
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
    t.string "domain"
    t.index ["airtable_id"], name: "index_clients_on_airtable_id"
  end

  create_table "consultations", force: :cascade do |t|
    t.string "uid"
    t.bigint "specialist_id"
    t.bigint "user_id"
    t.string "status"
    t.string "topic"
    t.bigint "skill_id"
    t.string "airtable_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "interview_id"
    t.string "source"
    t.integer "likely_to_hire"
    t.datetime "request_started_at"
    t.datetime "request_completed_at"
    t.datetime "sent_at"
    t.datetime "accepted_at"
    t.datetime "rejected_at"
    t.datetime "advisable_rejected_at"
    t.bigint "search_id"
    t.index ["airtable_id"], name: "index_consultations_on_airtable_id"
    t.index ["interview_id"], name: "index_consultations_on_interview_id"
    t.index ["search_id"], name: "index_consultations_on_search_id"
    t.index ["skill_id"], name: "index_consultations_on_skill_id"
    t.index ["specialist_id"], name: "index_consultations_on_specialist_id"
    t.index ["uid"], name: "index_consultations_on_uid"
    t.index ["user_id"], name: "index_consultations_on_user_id"
  end

  create_table "countries", force: :cascade do |t|
    t.string "name"
    t.string "currency"
    t.string "airtable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "uid"
    t.boolean "eu"
    t.string "alpha2"
  end

  create_table "featured_specialist_contents", force: :cascade do |t|
    t.string "airtable_id"
    t.string "name"
    t.jsonb "skill"
    t.string "specialist"
    t.string "specialist_skills"
    t.text "featured_biography"
    t.integer "featured_specialist_score"
    t.string "featured_specialist_status"
    t.string "specialist_id"
    t.string "skill_id"
    t.string "micro_niche_description"
    t.string "companies_worked_with"
    t.string "examples_of_services"
    t.string "specialist_image"
    t.string "specialist_city"
    t.string "specialist_country"
    t.jsonb "page_skills"
    t.datetime "featured_specialist_status_applied"
    t.datetime "featured_specialist_status_reviewed"
    t.datetime "featured_specialist_status_posted"
    t.datetime "featured_specialist_status_rejected"
    t.jsonb "secondary_skills"
    t.integer "micro_niche_rating"
    t.integer "featured_biography_character_length"
    t.string "name_of_freelancers_with_high_score"
    t.string "edited"
    t.integer "number_of_pages_featured_on"
    t.string "first_30_characters"
    t.string "specialist_image_real"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["airtable_id"], name: "index_featured_specialist_contents_on_airtable_id"
  end

  create_table "industries", force: :cascade do |t|
    t.string "name"
    t.string "uid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "airtable_id"
    t.string "color"
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
    t.string "availability_note"
    t.index ["airtable_id"], name: "index_interviews_on_airtable_id"
    t.index ["application_id"], name: "index_interviews_on_application_id"
    t.index ["user_id"], name: "index_interviews_on_user_id"
  end

  create_table "matches", force: :cascade do |t|
    t.bigint "specialist_id"
    t.bigint "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "status"
    t.index ["project_id"], name: "index_matches_on_project_id"
    t.index ["specialist_id"], name: "index_matches_on_specialist_id"
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
    t.string "validation_explanation"
    t.string "company_type"
    t.boolean "public_use"
    t.string "uid"
    t.string "goal"
    t.string "contact_relationship"
    t.boolean "hide_from_profile"
    t.integer "priority"
    t.integer "advisable_score"
    t.bigint "application_id"
    t.index ["airtable_id"], name: "index_off_platform_projects_on_airtable_id"
    t.index ["application_id"], name: "index_off_platform_projects_on_application_id"
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

  create_table "project_contents", force: :cascade do |t|
    t.string "airtable_id"
    t.string "project_id"
    t.text "project_description"
    t.string "specialist_review_comment"
    t.string "specialist_image"
    t.integer "specialist_review_score"
    t.string "specialist_id"
    t.string "specialist_first_name"
    t.string "specialist_last_name"
    t.string "client_industry"
    t.string "client_contact_first_name"
    t.string "client_contact_last_name"
    t.string "client_name"
    t.string "client_contact_job_title"
    t.string "okay_with_naming_client"
    t.jsonb "skills_required"
    t.jsonb "pages_featured_on"
    t.integer "featured_project_score"
    t.string "suitable_for_freelancers_page"
    t.string "client_logo"
    t.string "project_type"
    t.jsonb "primary_skill"
    t.integer "specialist_review_comment_length"
    t.string "okay_to_use_publicly"
    t.string "specialist_city"
    t.string "specialist_country"
    t.string "our_talent_page"
    t.integer "project_description_length"
    t.string "status"
    t.string "specialist_image_real"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "project_industries", force: :cascade do |t|
    t.bigint "industry_id"
    t.string "project_type"
    t.bigint "project_id"
    t.boolean "primary"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["industry_id"], name: "index_project_industries_on_industry_id"
    t.index ["project_type", "project_id"], name: "index_project_industries_on_project_type_and_project_id"
  end

  create_table "project_skills", force: :cascade do |t|
    t.bigint "skill_id"
    t.string "project_type"
    t.bigint "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "primary"
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
    t.string "owner"
    t.string "campaign_source"
    t.datetime "brief_pending_confirmation_at"
    t.datetime "brief_confirmed_at"
    t.datetime "interview_scheduled_at"
    t.datetime "call_scheduled_at"
    t.datetime "candidate_proposed_at"
    t.datetime "candidate_accepted_at"
    t.datetime "interview_completed_at"
    t.datetime "booking_request_sent_at"
    t.datetime "booking_confirmed_at"
    t.datetime "proposal_received_at"
    t.datetime "won_at"
    t.datetime "lost_at"
    t.string "deposit_payment_intent_id"
    t.string "campaign_name"
    t.string "uid"
    t.string "industry"
    t.string "company_type"
    t.boolean "industry_experience_required"
    t.boolean "company_type_experience_required"
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

  create_table "sales_people", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "username"
    t.boolean "active"
    t.boolean "out_of_office"
    t.string "slack"
    t.string "calendly_url"
    t.string "asana_id"
    t.string "airtable_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "searches", force: :cascade do |t|
    t.string "uid"
    t.bigint "user_id", null: false
    t.string "skill"
    t.string "industry"
    t.boolean "industry_experience_required"
    t.string "company_type"
    t.boolean "company_experience_required"
    t.bigint "recommended_project_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["recommended_project_id"], name: "index_searches_on_recommended_project_id"
    t.index ["uid"], name: "index_searches_on_uid"
    t.index ["user_id"], name: "index_searches_on_user_id"
  end

  create_table "skills", force: :cascade do |t|
    t.string "name"
    t.string "airtable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "category"
    t.boolean "profile"
    t.string "uid"
    t.bigint "original_id"
    t.boolean "active"
    t.integer "projects_count", default: 0
    t.integer "specialists_count", default: 0
    t.index ["original_id"], name: "index_skills_on_original_id"
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
    t.string "application_stage"
    t.text "completed_tutorials", default: [], array: true
    t.string "bank_holder_name"
    t.jsonb "bank_holder_address", default: {}
    t.string "bank_currency"
    t.string "vat_number"
    t.boolean "primarily_freelance"
    t.string "number_of_projects"
    t.integer "hourly_rate"
    t.string "website"
    t.boolean "public_use"
    t.string "pid"
    t.string "campaign_name"
    t.string "campaign_source"
    t.string "referrer"
    t.string "confirmation_token"
    t.decimal "average_score"
    t.integer "project_count"
    t.index ["country_id"], name: "index_specialists_on_country_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "name"
    t.string "uid"
    t.string "airtable_id"
    t.string "stage"
    t.integer "estimate"
    t.datetime "due_date"
    t.string "description"
    t.string "submitted_for_approval_comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "application_id"
    t.string "repeat"
    t.integer "flexible_estimate"
    t.integer "hours_worked"
    t.boolean "trial"
    t.string "stripe_invoice_id"
    t.string "estimate_type"
    t.integer "final_cost"
    t.datetime "to_be_invited_at"
    t.datetime "quote_requested_at"
    t.datetime "quote_provided_at"
    t.datetime "assigned_at"
    t.datetime "started_working_at"
    t.datetime "submitted_at"
    t.datetime "approved_at"
    t.index ["airtable_id"], name: "index_tasks_on_airtable_id"
    t.index ["application_id"], name: "index_tasks_on_application_id"
    t.index ["uid"], name: "index_tasks_on_uid"
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
    t.text "completed_tutorials", default: [], array: true
    t.string "stripe_customer_id"
    t.string "project_payment_method"
    t.string "invoice_name"
    t.string "invoice_company_name"
    t.string "vat_number"
    t.jsonb "address"
    t.datetime "accepted_project_payment_terms_at"
    t.string "exceptional_project_payment_terms"
    t.string "stripe_setup_intent_id"
    t.string "setup_intent_status"
    t.string "confirmation_token"
    t.string "company_type"
    t.bigint "industry_id"
    t.string "campaign_name"
    t.string "campaign_source"
    t.string "pid"
    t.string "rid"
    t.string "gclid"
    t.boolean "bank_transfers_enabled", default: false
    t.string "billing_email"
    t.boolean "payments_setup", default: false
    t.string "time_zone"
    t.string "campaign_medium"
    t.index ["airtable_id"], name: "index_users_on_airtable_id"
    t.index ["country_id"], name: "index_users_on_country_id"
    t.index ["industry_id"], name: "index_users_on_industry_id"
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
  add_foreign_key "client_calls", "projects"
  add_foreign_key "client_calls", "sales_people"
  add_foreign_key "client_calls", "users"
  add_foreign_key "client_users", "clients"
  add_foreign_key "client_users", "users"
  add_foreign_key "consultations", "interviews"
  add_foreign_key "consultations", "skills"
  add_foreign_key "consultations", "specialists"
  add_foreign_key "consultations", "users"
  add_foreign_key "interviews", "applications"
  add_foreign_key "interviews", "users"
  add_foreign_key "matches", "projects"
  add_foreign_key "matches", "specialists"
  add_foreign_key "off_platform_projects", "specialists"
  add_foreign_key "payments", "projects"
  add_foreign_key "project_industries", "industries"
  add_foreign_key "project_skills", "skills"
  add_foreign_key "projects", "clients"
  add_foreign_key "projects", "users"
  add_foreign_key "reviews", "specialists"
  add_foreign_key "searches", "users"
  add_foreign_key "skills", "skills", column: "original_id"
  add_foreign_key "specialist_skills", "skills"
  add_foreign_key "specialist_skills", "specialists"
  add_foreign_key "specialists", "countries"
  add_foreign_key "users", "countries"
  add_foreign_key "users", "industries"
end
