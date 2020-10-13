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

ActiveRecord::Schema.define(version: 2020_10_15_063933) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "citext"
  enable_extension "pgcrypto"
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "accounts", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "password_digest"
    t.citext "email"
    t.string "uid"
    t.datetime "confirmed_at"
    t.string "confirmation_digest"
    t.bigint "country_id"
    t.string "reset_digest"
    t.datetime "reset_sent_at"
    t.jsonb "permissions", default: []
    t.jsonb "completed_tutorials", default: []
    t.string "vat_number"
    t.string "confirmation_token"
    t.boolean "test_account"
    t.string "remember_token"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["country_id"], name: "index_accounts_on_country_id"
    t.index ["email"], name: "index_accounts_on_email", unique: true
    t.index ["uid"], name: "index_accounts_on_uid", unique: true
  end

  create_table "action_mailbox_inbound_emails", force: :cascade do |t|
    t.integer "status", default: 0, null: false
    t.string "message_id", null: false
    t.string "message_checksum", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["message_id", "message_checksum"], name: "index_action_mailbox_inbound_emails_uniqueness", unique: true
  end

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

  create_table "answers", force: :cascade do |t|
    t.string "content"
    t.bigint "question_id", null: false
    t.bigint "specialist_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "uid"
    t.index ["question_id"], name: "index_answers_on_question_id"
    t.index ["specialist_id"], name: "index_answers_on_specialist_id"
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
    t.boolean "auto_apply"
    t.boolean "hide_from_profile"
    t.index ["project_id"], name: "index_applications_on_project_id"
    t.index ["rejection_reason_id"], name: "index_applications_on_rejection_reason_id"
    t.index ["specialist_id"], name: "index_applications_on_specialist_id"
  end

  create_table "auth_providers", force: :cascade do |t|
    t.string "uid"
    t.string "provider"
    t.string "token"
    t.string "refresh_token"
    t.datetime "expires_at"
    t.bigint "user_id", null: false
    t.jsonb "blob"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["provider", "uid"], name: "index_auth_providers_on_provider_and_uid", unique: true
    t.index ["user_id"], name: "index_auth_providers_on_user_id"
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
    t.integer "call_attempt_count"
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
    t.string "rejection_reason"
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
    t.string "dial_in_number"
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

  create_table "follows", force: :cascade do |t|
    t.string "followable_type", null: false
    t.uuid "followable_id", null: false
    t.string "follower_type", null: false
    t.bigint "follower_id", null: false
    t.boolean "blocked", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["followable_id", "followable_type"], name: "fk_followables"
    t.index ["followable_type", "followable_id"], name: "index_follows_on_followable_type_and_followable_id"
    t.index ["follower_id", "follower_type"], name: "fk_follows"
    t.index ["follower_type", "follower_id"], name: "index_follows_on_follower_type_and_follower_id"
  end

  create_table "guild_comments", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "body", null: false
    t.integer "reactionable_count", default: 0, null: false
    t.uuid "guild_post_id"
    t.bigint "specialist_id"
    t.uuid "parent_comment_id"
    t.integer "status", default: 0, null: false
    t.jsonb "data"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["guild_post_id"], name: "index_guild_comments_on_guild_post_id"
    t.index ["parent_comment_id"], name: "index_guild_comments_on_parent_comment_id"
    t.index ["specialist_id"], name: "index_guild_comments_on_specialist_id"
  end

  create_table "guild_posts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "type", default: "Post", null: false
    t.text "body", null: false
    t.text "body_raw", default: "", null: false
    t.string "title", null: false
    t.integer "status", default: 0, null: false
    t.integer "audience", default: 0, null: false
    t.boolean "commentable", default: true, null: false
    t.integer "comments_count", default: 0, null: false
    t.boolean "reactionable", default: true, null: false
    t.integer "reactionable_count", default: 0, null: false
    t.bigint "specialist_id"
    t.jsonb "data", default: {}, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["data"], name: "index_guild_posts_on_data", using: :gin
    t.index ["specialist_id"], name: "index_guild_posts_on_specialist_id"
  end

  create_table "guild_reactions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "reactionable_type"
    t.uuid "reactionable_id"
    t.bigint "specialist_id"
    t.integer "kind", default: 0, null: false
    t.integer "status", default: 0, null: false
    t.jsonb "data"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["reactionable_type", "reactionable_id"], name: "index_guild_reactions_on_reactionable_type_and_reactionable_id"
    t.index ["specialist_id"], name: "index_guild_reactions_on_specialist_id"
  end

  create_table "industries", force: :cascade do |t|
    t.string "name"
    t.string "uid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "airtable_id"
    t.string "color"
    t.boolean "active"
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
    t.string "zoom_meeting_id"
    t.string "uid"
    t.datetime "call_requested_at"
    t.datetime "call_scheduled_at"
    t.datetime "requested_more_time_options_at"
    t.datetime "more_time_options_added_at"
    t.datetime "client_requested_reschedule_at"
    t.datetime "specialist_requested_reschedule_at"
    t.index ["airtable_id"], name: "index_interviews_on_airtable_id"
    t.index ["application_id"], name: "index_interviews_on_application_id"
    t.index ["user_id"], name: "index_interviews_on_user_id"
  end

  create_table "magic_links", force: :cascade do |t|
    t.bigint "account_id", null: false
    t.string "path"
    t.string "digest"
    t.datetime "expires_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["account_id"], name: "index_magic_links_on_account_id"
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
    t.boolean "draft"
    t.boolean "description_requires_update"
    t.integer "industry_relevance"
    t.integer "location_relevance"
    t.integer "cost_to_hire"
    t.integer "execution_cost"
    t.string "pending_description"
    t.string "validation_failed_reason"
    t.bigint "reviewed_by_id"
    t.index ["airtable_id"], name: "index_off_platform_projects_on_airtable_id"
    t.index ["application_id"], name: "index_off_platform_projects_on_application_id"
    t.index ["reviewed_by_id"], name: "index_off_platform_projects_on_reviewed_by_id"
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

  create_table "previous_project_images", force: :cascade do |t|
    t.integer "position"
    t.bigint "off_platform_project_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "uid"
    t.boolean "cover"
    t.index ["off_platform_project_id"], name: "index_previous_project_images_on_off_platform_project_id"
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
    t.text "characteristics", default: [], array: true
    t.datetime "accepted_terms_at"
    t.integer "deposit"
    t.string "status"
    t.integer "deposit_paid"
    t.string "primary_skill"
    t.bigint "user_id"
    t.string "service_type"
    t.string "estimated_budget"
    t.boolean "remote"
    t.string "sales_status"
    t.string "deposit_payment_intent_id"
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
    t.string "campaign_name"
    t.string "uid"
    t.string "industry"
    t.string "company_type"
    t.boolean "industry_experience_required"
    t.boolean "company_type_experience_required"
    t.integer "industry_experience_importance"
    t.integer "location_importance"
    t.integer "likely_to_hire"
    t.integer "candidate_count", default: 0
    t.integer "proposed_count", default: 0
    t.integer "hired_count", default: 0
    t.boolean "sourcing"
    t.bigint "sales_person_id"
    t.bigint "linkedin_campaign_id"
    t.index ["client_id"], name: "index_projects_on_client_id"
    t.index ["sales_person_id"], name: "index_projects_on_sales_person_id"
    t.index ["user_id"], name: "index_projects_on_user_id"
  end

  create_table "questions", force: :cascade do |t|
    t.string "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "uid"
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
    t.string "uid"
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
    t.string "uid"
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
    t.string "description"
    t.bigint "manually_recommended_project_id"
    t.index ["manually_recommended_project_id"], name: "index_searches_on_manually_recommended_project_id"
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
    t.string "characteristic_placeholder"
    t.string "goal_placeholder"
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
    t.string "phone"
    t.boolean "test_account"
    t.string "remember_token"
    t.boolean "guild", default: false
    t.string "community_status"
    t.boolean "automated_invitations_subscription"
    t.jsonb "guild_data"
    t.bigint "account_id"
    t.datetime "community_applied_at"
    t.datetime "community_accepted_at"
    t.datetime "community_invited_to_call_at"
    t.integer "community_score"
    t.index ["account_id"], name: "index_specialists_on_account_id"
    t.index ["country_id"], name: "index_specialists_on_country_id"
  end

  create_table "taggings", id: :serial, force: :cascade do |t|
    t.uuid "tag_id"
    t.string "taggable_type"
    t.uuid "taggable_id"
    t.string "tagger_type"
    t.integer "tagger_id"
    t.string "context", limit: 128
    t.datetime "created_at"
    t.index ["context"], name: "index_taggings_on_context"
    t.index ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true
    t.index ["tag_id"], name: "index_taggings_on_tag_id"
    t.index ["taggable_id", "taggable_type", "context"], name: "taggings_taggable_context_idx"
    t.index ["taggable_id", "taggable_type", "tagger_id", "context"], name: "taggings_idy"
    t.index ["taggable_id"], name: "index_taggings_on_taggable_id"
    t.index ["taggable_type"], name: "index_taggings_on_taggable_type"
    t.index ["tagger_id", "tagger_type"], name: "index_taggings_on_tagger_id_and_tagger_type"
    t.index ["tagger_id"], name: "index_taggings_on_tagger_id"
  end

  create_table "tags", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string "name"
    t.integer "alias_tag_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "taggings_count", default: 0
    t.index ["name"], name: "index_tags_on_name", unique: true
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

  create_table "user_skills", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "skill_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["skill_id"], name: "index_user_skills_on_skill_id"
    t.index ["user_id"], name: "index_user_skills_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "airtable_id"
    t.text "availability"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.string "email"
    t.string "uid"
    t.datetime "confirmed_at"
    t.string "confirmation_digest"
    t.bigint "country_id"
    t.string "reset_digest"
    t.datetime "reset_sent_at"
    t.string "company_name"
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
    t.bigint "sales_person_id"
    t.string "contact_status"
    t.string "fid"
    t.boolean "test_account"
    t.bigint "budget"
    t.integer "locality_importance"
    t.datetime "accepted_guarantee_terms_at"
    t.string "talent_quality"
    t.string "rejection_reason"
    t.string "number_of_freelancers"
    t.datetime "application_accepted_at"
    t.datetime "application_rejected_at"
    t.datetime "application_reminder_at"
    t.string "remember_token"
    t.bigint "account_id"
    t.index ["account_id"], name: "index_users_on_account_id"
    t.index ["airtable_id"], name: "index_users_on_airtable_id"
    t.index ["country_id"], name: "index_users_on_country_id"
    t.index ["industry_id"], name: "index_users_on_industry_id"
    t.index ["sales_person_id"], name: "index_users_on_sales_person_id"
  end

  create_table "video_calls", force: :cascade do |t|
    t.string "uid"
    t.bigint "interview_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "fallback"
    t.string "zoom_meeting_id"
    t.string "zoom_passcode"
    t.string "zoom_url"
    t.index ["interview_id"], name: "index_video_calls_on_interview_id"
    t.index ["uid"], name: "index_video_calls_on_uid"
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

  add_foreign_key "accounts", "countries"
  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "answers", "questions"
  add_foreign_key "answers", "specialists"
  add_foreign_key "application_references", "applications"
  add_foreign_key "applications", "application_rejection_reasons", column: "rejection_reason_id"
  add_foreign_key "applications", "projects"
  add_foreign_key "applications", "specialists"
  add_foreign_key "auth_providers", "users"
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
  add_foreign_key "guild_comments", "guild_posts", on_delete: :cascade
  add_foreign_key "guild_comments", "specialists", on_delete: :cascade
  add_foreign_key "guild_posts", "specialists"
  add_foreign_key "guild_reactions", "specialists", on_delete: :cascade
  add_foreign_key "interviews", "applications"
  add_foreign_key "interviews", "users"
  add_foreign_key "matches", "projects"
  add_foreign_key "matches", "specialists"
  add_foreign_key "off_platform_projects", "specialists"
  add_foreign_key "payments", "projects"
  add_foreign_key "previous_project_images", "off_platform_projects"
  add_foreign_key "project_industries", "industries"
  add_foreign_key "project_skills", "skills"
  add_foreign_key "projects", "clients"
  add_foreign_key "projects", "sales_people"
  add_foreign_key "projects", "users"
  add_foreign_key "reviews", "specialists"
  add_foreign_key "searches", "off_platform_projects", column: "manually_recommended_project_id"
  add_foreign_key "searches", "users"
  add_foreign_key "skills", "skills", column: "original_id"
  add_foreign_key "specialist_skills", "skills"
  add_foreign_key "specialist_skills", "specialists"
  add_foreign_key "specialists", "accounts"
  add_foreign_key "specialists", "countries"
  add_foreign_key "taggings", "tags"
  add_foreign_key "user_skills", "skills"
  add_foreign_key "user_skills", "users"
  add_foreign_key "users", "accounts"
  add_foreign_key "users", "countries"
  add_foreign_key "users", "industries"
  add_foreign_key "users", "sales_people"
  add_foreign_key "video_calls", "interviews"
end
