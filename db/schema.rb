# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_07_13_095206) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "citext"
  enable_extension "hstore"
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
    t.string "reset_digest"
    t.datetime "reset_sent_at"
    t.jsonb "permissions", default: []
    t.jsonb "completed_tutorials", default: []
    t.string "confirmation_token"
    t.boolean "test_account"
    t.string "remember_token"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.jsonb "log_data"
    t.datetime "deleted_at"
    t.jsonb "unsubscribed_from"
    t.datetime "disabled_at"
    t.jsonb "features"
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
    t.integer "position"
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
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
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
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "off_platform_project_id"
    t.index ["application_id"], name: "index_application_references_on_application_id"
    t.index ["off_platform_project_id"], name: "index_application_references_on_off_platform_project_id"
    t.index ["uid"], name: "index_application_references_on_uid"
  end

  create_table "applications", force: :cascade do |t|
    t.string "availability"
    t.string "status"
    t.text "introduction"
    t.jsonb "questions"
    t.integer "score"
    t.bigint "specialist_id"
    t.bigint "project_id"
    t.string "airtable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "accepts_fee"
    t.boolean "accepts_terms"
    t.boolean "featured", default: false
    t.string "comment"
    t.text "rejection_reason"
    t.text "rejection_reason_comment"
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
    t.jsonb "log_data"
    t.text "rejection_feedback"
    t.jsonb "meta_fields"
    t.string "source"
    t.integer "invoice_rate"
    t.index ["project_id"], name: "index_applications_on_project_id"
    t.index ["specialist_id"], name: "index_applications_on_specialist_id"
    t.index ["status"], name: "index_applications_on_status"
    t.index ["uid"], name: "index_applications_on_uid"
  end

  create_table "auth_providers", force: :cascade do |t|
    t.string "uid"
    t.string "provider"
    t.string "token"
    t.string "refresh_token"
    t.datetime "expires_at"
    t.jsonb "blob"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "account_id", null: false
    t.index ["account_id"], name: "index_auth_providers_on_account_id"
    t.index ["provider", "uid"], name: "index_auth_providers_on_provider_and_uid", unique: true
  end

  create_table "blacklisted_domains", force: :cascade do |t|
    t.string "domain"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "case_study_archived_articles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "article_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["article_id"], name: "index_case_study_archived_articles_on_article_id"
    t.index ["user_id"], name: "index_case_study_archived_articles_on_user_id"
  end

  create_table "case_study_articles", force: :cascade do |t|
    t.string "uid", null: false
    t.integer "score"
    t.boolean "confidential"
    t.string "title"
    t.string "subtitle"
    t.text "comment"
    t.string "excerpt"
    t.jsonb "goals"
    t.datetime "published_at"
    t.datetime "specialist_approved_at"
    t.bigint "specialist_id", null: false
    t.bigint "interviewer_id"
    t.bigint "editor_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "company_id"
    t.jsonb "log_data"
    t.string "airtable_id"
    t.jsonb "company_type"
    t.jsonb "targeting"
    t.text "editor_note"
    t.text "freelancer_edits"
    t.index ["airtable_id"], name: "index_case_study_articles_on_airtable_id", unique: true
    t.index ["company_id"], name: "index_case_study_articles_on_company_id"
    t.index ["editor_id"], name: "index_case_study_articles_on_editor_id"
    t.index ["interviewer_id"], name: "index_case_study_articles_on_interviewer_id"
    t.index ["specialist_id"], name: "index_case_study_articles_on_specialist_id"
    t.index ["uid"], name: "index_case_study_articles_on_uid"
  end

  create_table "case_study_companies", force: :cascade do |t|
    t.string "uid", null: false
    t.string "name"
    t.text "description"
    t.string "website"
    t.string "business_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.jsonb "log_data"
    t.index ["uid"], name: "index_case_study_companies_on_uid"
  end

  create_table "case_study_contents", force: :cascade do |t|
    t.string "uid", null: false
    t.bigint "section_id", null: false
    t.string "type"
    t.integer "position"
    t.jsonb "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.jsonb "log_data"
    t.index ["section_id"], name: "index_case_study_contents_on_section_id"
    t.index ["uid"], name: "index_case_study_contents_on_uid"
  end

  create_table "case_study_industries", force: :cascade do |t|
    t.string "uid", null: false
    t.bigint "article_id", null: false
    t.bigint "industry_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.jsonb "log_data"
    t.index ["article_id"], name: "index_case_study_industries_on_article_id"
    t.index ["industry_id"], name: "index_case_study_industries_on_industry_id"
    t.index ["uid"], name: "index_case_study_industries_on_uid"
  end

  create_table "case_study_saved_articles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "article_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["article_id"], name: "index_case_study_saved_articles_on_article_id"
    t.index ["user_id"], name: "index_case_study_saved_articles_on_user_id"
  end

  create_table "case_study_search_feedbacks", force: :cascade do |t|
    t.bigint "search_id", null: false
    t.bigint "article_id", null: false
    t.text "feedback"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["article_id"], name: "index_case_study_search_feedbacks_on_article_id"
    t.index ["search_id"], name: "index_case_study_search_feedbacks_on_search_id"
  end

  create_table "case_study_searches", force: :cascade do |t|
    t.string "uid", null: false
    t.string "name"
    t.bigint "user_id", null: false
    t.string "business_type"
    t.jsonb "goals"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.jsonb "log_data"
    t.jsonb "results"
    t.boolean "company_recomendation"
    t.index ["uid"], name: "index_case_study_searches_on_uid"
    t.index ["user_id"], name: "index_case_study_searches_on_user_id"
  end

  create_table "case_study_sections", force: :cascade do |t|
    t.string "uid", null: false
    t.bigint "article_id", null: false
    t.string "type"
    t.integer "position"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.jsonb "log_data"
    t.index ["article_id"], name: "index_case_study_sections_on_article_id"
    t.index ["uid"], name: "index_case_study_sections_on_uid"
  end

  create_table "case_study_shared_articles", force: :cascade do |t|
    t.bigint "article_id", null: false
    t.bigint "shared_with_id", null: false
    t.bigint "shared_by_id", null: false
    t.text "message"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "uid"
    t.index ["article_id"], name: "index_case_study_shared_articles_on_article_id"
    t.index ["shared_by_id"], name: "index_case_study_shared_articles_on_shared_by_id"
    t.index ["shared_with_id"], name: "index_case_study_shared_articles_on_shared_with_id"
  end

  create_table "case_study_skills", force: :cascade do |t|
    t.string "uid", null: false
    t.boolean "primary"
    t.bigint "article_id"
    t.bigint "skill_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.jsonb "log_data"
    t.bigint "search_id"
    t.index ["article_id"], name: "index_case_study_skills_on_article_id"
    t.index ["search_id"], name: "index_case_study_skills_on_search_id"
    t.index ["skill_id"], name: "index_case_study_skills_on_skill_id"
    t.index ["uid"], name: "index_case_study_skills_on_uid"
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

  create_table "companies", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.string "kind"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "sales_person_id"
    t.bigint "industry_id"
    t.string "stripe_customer_id"
    t.string "stripe_setup_intent_id"
    t.string "setup_intent_status"
    t.boolean "payments_setup", default: false
    t.string "project_payment_method"
    t.datetime "accepted_project_payment_terms_at"
    t.string "invoice_name"
    t.string "invoice_company_name"
    t.string "billing_email"
    t.string "vat_number"
    t.jsonb "address"
    t.boolean "bank_transfers_enabled", default: false
    t.jsonb "goals"
    t.boolean "feedback"
    t.string "business_type"
    t.string "marketing_attitude"
    t.bigint "budget"
    t.jsonb "log_data"
    t.integer "admin_fee"
    t.index ["industry_id"], name: "index_companies_on_industry_id"
    t.index ["sales_person_id"], name: "index_companies_on_sales_person_id"
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

  create_table "event_attendees", force: :cascade do |t|
    t.bigint "event_id"
    t.bigint "specialist_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["event_id"], name: "index_event_attendees_on_event_id"
    t.index ["specialist_id", "event_id"], name: "index_event_attendees_on_specialist_id_and_event_id", unique: true
    t.index ["specialist_id"], name: "index_event_attendees_on_specialist_id"
  end

  create_table "events", force: :cascade do |t|
    t.string "uid", null: false
    t.string "title", null: false
    t.text "description", null: false
    t.string "url"
    t.string "color", null: false
    t.bigint "host_id"
    t.boolean "featured", default: false
    t.datetime "published_at"
    t.datetime "starts_at"
    t.datetime "ends_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "google_calendar_id"
    t.string "status"
    t.index ["host_id"], name: "index_events_on_host_id"
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

  create_table "guild_post_engagements", force: :cascade do |t|
    t.bigint "specialist_id"
    t.uuid "guild_post_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["guild_post_id"], name: "index_guild_post_engagements_on_guild_post_id"
    t.index ["specialist_id", "guild_post_id"], name: "index_guild_post_engagements_on_specialist_id_and_guild_post_id", unique: true
    t.index ["specialist_id"], name: "index_guild_post_engagements_on_specialist_id"
  end

  create_table "guild_post_images", force: :cascade do |t|
    t.uuid "guild_post_id"
    t.string "uid"
    t.string "string"
    t.integer "position"
    t.boolean "cover"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["guild_post_id"], name: "index_guild_post_images_on_guild_post_id"
    t.index ["string"], name: "index_guild_post_images_on_string"
    t.index ["uid"], name: "index_guild_post_images_on_uid"
  end

  create_table "guild_posts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "type", default: "Post", null: false
    t.text "body"
    t.string "title"
    t.integer "status", default: 0, null: false
    t.integer "comments_count", default: 0, null: false
    t.integer "reactionable_count", default: 0, null: false
    t.bigint "specialist_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "engagements_count", default: 0
    t.boolean "shareable", default: false
    t.boolean "pinned", default: false
    t.datetime "boosted_at"
    t.datetime "resolved_at"
    t.string "audience_type"
    t.uuid "post_prompt_id"
    t.bigint "article_id"
    t.index ["article_id"], name: "index_guild_posts_on_article_id"
    t.index ["post_prompt_id"], name: "index_guild_posts_on_post_prompt_id"
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
    t.index ["specialist_id", "reactionable_type", "reactionable_id"], name: "index_guild_reactions_on_specialist_reactionable", unique: true
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
    t.jsonb "log_data"
    t.index ["application_id"], name: "index_interviews_on_application_id"
    t.index ["user_id"], name: "index_interviews_on_user_id"
  end

  create_table "labelings", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "label_id", null: false
    t.uuid "guild_post_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["guild_post_id"], name: "index_labelings_on_guild_post_id"
    t.index ["label_id", "guild_post_id"], name: "index_labelings_on_label_id_and_guild_post_id", unique: true
    t.index ["label_id"], name: "index_labelings_on_label_id"
  end

  create_table "labels", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.datetime "published_at"
    t.integer "labelings_count"
    t.bigint "country_id"
    t.bigint "industry_id"
    t.bigint "skill_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "description"
    t.index ["country_id"], name: "index_labels_on_country_id", unique: true
    t.index ["industry_id"], name: "index_labels_on_industry_id", unique: true
    t.index ["skill_id"], name: "index_labels_on_skill_id", unique: true
    t.index ["slug"], name: "index_labels_on_slug", unique: true
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

  create_table "notifications", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.bigint "account_id", null: false
    t.bigint "actor_id"
    t.string "action", null: false
    t.string "notifiable_type", null: false
    t.uuid "notifiable_id", null: false
    t.datetime "read_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["account_id"], name: "index_notifications_on_account_id"
    t.index ["actor_id"], name: "index_notifications_on_actor_id"
    t.index ["notifiable_type", "notifiable_id"], name: "index_notifications_on_notifiable"
  end

  create_table "off_platform_projects", force: :cascade do |t|
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
    t.jsonb "log_data"
    t.bigint "cover_photo_id"
    t.index ["application_id"], name: "index_off_platform_projects_on_application_id"
    t.index ["reviewed_by_id"], name: "index_off_platform_projects_on_reviewed_by_id"
    t.index ["specialist_id"], name: "index_off_platform_projects_on_specialist_id"
  end

  create_table "payments", force: :cascade do |t|
    t.string "uid"
    t.integer "amount"
    t.integer "admin_fee"
    t.string "status"
    t.uuid "company_id", null: false
    t.bigint "specialist_id", null: false
    t.bigint "task_id"
    t.string "payment_intent_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_payments_on_company_id"
    t.index ["specialist_id"], name: "index_payments_on_specialist_id"
    t.index ["task_id"], name: "index_payments_on_task_id"
  end

  create_table "payouts", force: :cascade do |t|
    t.string "uid"
    t.bigint "specialist_id", null: false
    t.bigint "task_id"
    t.integer "amount"
    t.integer "sourcing_fee"
    t.string "status"
    t.datetime "processed_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["specialist_id"], name: "index_payouts_on_specialist_id"
    t.index ["task_id"], name: "index_payouts_on_task_id"
  end

  create_table "post_prompts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "prompt"
    t.string "cta"
    t.integer "guild_posts_count", default: 0
    t.boolean "featured", default: false
    t.uuid "label_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["label_id"], name: "index_post_prompts_on_label_id"
  end

  create_table "problematic_flags", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.bigint "application_id", null: false
    t.bigint "user_id", null: false
    t.text "message"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["application_id"], name: "index_problematic_flags_on_application_id"
    t.index ["user_id"], name: "index_problematic_flags_on_user_id"
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
    t.index ["project_type", "project_id"], name: "index_project_skills_on_project"
    t.index ["skill_id"], name: "index_project_skills_on_skill_id"
  end

  create_table "projects", force: :cascade do |t|
    t.string "name"
    t.string "airtable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "currency"
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
    t.bigint "user_id"
    t.string "service_type"
    t.string "estimated_budget"
    t.boolean "remote"
    t.string "sales_status"
    t.string "deposit_payment_intent_id"
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
    t.bigint "linkedin_campaign_id"
    t.datetime "published_at"
    t.jsonb "log_data"
    t.boolean "stop_candidate_proposed_emails"
    t.string "level_of_expertise_required"
    t.integer "likelihood_to_confirm"
    t.string "lost_reason"
    t.string "project_start"
    t.integer "deposit_used"
    t.index ["sales_status"], name: "index_projects_on_sales_status"
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
    t.bigint "specialist_id"
    t.bigint "project_id"
    t.text "comment"
    t.jsonb "ratings"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "uid"
    t.index ["airtable_id"], name: "index_reviews_on_airtable_id"
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

  create_table "skill_similarities", force: :cascade do |t|
    t.bigint "skill1_id", null: false
    t.bigint "skill2_id", null: false
    t.integer "similarity", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["skill1_id", "skill2_id"], name: "index_skill_similarities_on_skill1_id_and_skill2_id", unique: true
    t.index ["skill1_id"], name: "index_skill_similarities_on_skill1_id"
    t.index ["skill2_id"], name: "index_skill_similarities_on_skill2_id"
  end

  create_table "skills", force: :cascade do |t|
    t.string "name"
    t.string "airtable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "category"
    t.boolean "profile"
    t.string "uid"
    t.boolean "active"
    t.integer "projects_count", default: 0
    t.integer "specialists_count", default: 0
    t.string "characteristic_placeholder"
    t.string "goal_placeholder"
    t.index ["airtable_id"], name: "index_skills_on_airtable_id", unique: true
    t.index ["uid"], name: "index_skills_on_uid"
  end

  create_table "specialist_industries", force: :cascade do |t|
    t.bigint "specialist_id", null: false
    t.bigint "industry_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["industry_id"], name: "index_specialist_industries_on_industry_id"
    t.index ["specialist_id"], name: "index_specialist_industries_on_specialist_id"
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
    t.boolean "remote"
    t.string "application_stage"
    t.string "bank_holder_name"
    t.jsonb "bank_holder_address", default: {}
    t.string "bank_currency"
    t.boolean "primarily_freelance"
    t.string "number_of_projects"
    t.integer "hourly_rate"
    t.string "website"
    t.boolean "public_use"
    t.string "pid"
    t.string "campaign_name"
    t.string "campaign_source"
    t.string "referrer"
    t.decimal "average_score"
    t.integer "project_count"
    t.string "phone"
    t.boolean "guild", default: false
    t.string "community_status"
    t.bigint "account_id"
    t.datetime "community_applied_at"
    t.datetime "community_accepted_at"
    t.datetime "community_invited_to_call_at"
    t.integer "community_score"
    t.integer "member_of_week_email"
    t.jsonb "log_data"
    t.date "unavailable_until"
    t.string "previous_work_description"
    t.string "previous_work_results"
    t.string "ideal_project"
    t.string "vat_number"
    t.string "application_interview_calendly_id"
    t.datetime "application_interview_starts_at"
    t.datetime "guild_joined_date"
    t.datetime "guild_featured_member_at"
    t.string "guild_calendly_link"
    t.bigint "referrer_id"
    t.integer "sourcing_fee"
    t.bigint "interviewer_id"
    t.string "case_study_status"
    t.string "trustpilot_review_status"
    t.string "campaign_medium"
    t.string "application_status"
    t.string "iban"
    t.index ["account_id"], name: "index_specialists_on_account_id"
    t.index ["airtable_id"], name: "index_specialists_on_airtable_id"
    t.index ["country_id"], name: "index_specialists_on_country_id"
    t.index ["interviewer_id"], name: "index_specialists_on_interviewer_id"
    t.index ["referrer_id"], name: "index_specialists_on_referrer_id"
    t.index ["uid"], name: "index_specialists_on_uid"
  end

  create_table "subscriptions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.bigint "specialist_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.uuid "label_id"
    t.index ["label_id"], name: "index_subscriptions_on_label_id"
    t.index ["specialist_id", "label_id"], name: "index_subscriptions_on_specialist_id_and_label_id", unique: true
    t.index ["specialist_id"], name: "index_subscriptions_on_specialist_id"
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
    t.jsonb "log_data"
    t.index ["airtable_id"], name: "index_tasks_on_airtable_id"
    t.index ["application_id"], name: "index_tasks_on_application_id"
    t.index ["stage"], name: "index_tasks_on_stage"
    t.index ["uid"], name: "index_tasks_on_uid"
  end

  create_table "toby_views", force: :cascade do |t|
    t.string "name"
    t.string "resource"
    t.jsonb "filters"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["resource"], name: "index_toby_views_on_resource"
  end

  create_table "unresponsiveness_reports", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.bigint "application_id", null: false
    t.bigint "reporter_id", null: false
    t.text "message"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["application_id"], name: "index_unresponsiveness_reports_on_application_id"
    t.index ["reporter_id"], name: "index_unresponsiveness_reports_on_reporter_id"
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
    t.string "airtable_id"
    t.text "availability"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "uid"
    t.bigint "country_id"
    t.string "title"
    t.string "stripe_customer_id"
    t.string "exceptional_project_payment_terms"
    t.string "stripe_setup_intent_id"
    t.string "setup_intent_status"
    t.string "campaign_name"
    t.string "campaign_source"
    t.string "pid"
    t.string "rid"
    t.string "gclid"
    t.string "time_zone"
    t.string "campaign_medium"
    t.string "contact_status"
    t.string "fid"
    t.integer "locality_importance"
    t.datetime "accepted_guarantee_terms_at"
    t.string "talent_quality"
    t.string "rejection_reason"
    t.string "number_of_freelancers"
    t.datetime "application_accepted_at"
    t.datetime "application_rejected_at"
    t.datetime "application_reminder_at"
    t.bigint "account_id"
    t.jsonb "log_data"
    t.uuid "company_id"
    t.datetime "application_interview_starts_at"
    t.string "trustpilot_review_status"
    t.index ["account_id"], name: "index_users_on_account_id"
    t.index ["airtable_id"], name: "index_users_on_airtable_id"
    t.index ["company_id"], name: "index_users_on_company_id"
    t.index ["country_id"], name: "index_users_on_country_id"
    t.index ["uid"], name: "index_users_on_uid"
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

  create_table "webhooks", force: :cascade do |t|
    t.string "url"
    t.string "status"
    t.jsonb "data"
    t.text "response"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "answers", "questions"
  add_foreign_key "answers", "specialists"
  add_foreign_key "application_references", "applications"
  add_foreign_key "application_references", "off_platform_projects"
  add_foreign_key "applications", "projects"
  add_foreign_key "applications", "specialists"
  add_foreign_key "auth_providers", "accounts"
  add_foreign_key "case_study_archived_articles", "case_study_articles", column: "article_id"
  add_foreign_key "case_study_archived_articles", "users"
  add_foreign_key "case_study_articles", "accounts", column: "editor_id"
  add_foreign_key "case_study_articles", "accounts", column: "interviewer_id"
  add_foreign_key "case_study_articles", "case_study_companies", column: "company_id"
  add_foreign_key "case_study_articles", "specialists"
  add_foreign_key "case_study_contents", "case_study_sections", column: "section_id"
  add_foreign_key "case_study_industries", "case_study_articles", column: "article_id"
  add_foreign_key "case_study_industries", "industries"
  add_foreign_key "case_study_saved_articles", "case_study_articles", column: "article_id"
  add_foreign_key "case_study_saved_articles", "users"
  add_foreign_key "case_study_search_feedbacks", "case_study_articles", column: "article_id"
  add_foreign_key "case_study_search_feedbacks", "case_study_searches", column: "search_id"
  add_foreign_key "case_study_searches", "users"
  add_foreign_key "case_study_sections", "case_study_articles", column: "article_id"
  add_foreign_key "case_study_shared_articles", "case_study_articles", column: "article_id"
  add_foreign_key "case_study_shared_articles", "users", column: "shared_by_id"
  add_foreign_key "case_study_shared_articles", "users", column: "shared_with_id"
  add_foreign_key "case_study_skills", "case_study_articles", column: "article_id"
  add_foreign_key "case_study_skills", "case_study_searches", column: "search_id"
  add_foreign_key "case_study_skills", "skills"
  add_foreign_key "client_calls", "projects"
  add_foreign_key "client_calls", "sales_people"
  add_foreign_key "client_calls", "users"
  add_foreign_key "companies", "industries"
  add_foreign_key "companies", "sales_people"
  add_foreign_key "consultations", "interviews"
  add_foreign_key "consultations", "skills"
  add_foreign_key "consultations", "specialists"
  add_foreign_key "consultations", "users"
  add_foreign_key "event_attendees", "events"
  add_foreign_key "event_attendees", "specialists"
  add_foreign_key "events", "specialists", column: "host_id"
  add_foreign_key "guild_comments", "guild_posts", on_delete: :cascade
  add_foreign_key "guild_comments", "specialists", on_delete: :cascade
  add_foreign_key "guild_post_engagements", "guild_posts"
  add_foreign_key "guild_post_engagements", "specialists"
  add_foreign_key "guild_post_images", "guild_posts", on_delete: :cascade
  add_foreign_key "guild_posts", "case_study_articles", column: "article_id"
  add_foreign_key "guild_posts", "specialists"
  add_foreign_key "guild_reactions", "specialists", on_delete: :cascade
  add_foreign_key "interviews", "applications"
  add_foreign_key "interviews", "users"
  add_foreign_key "labelings", "guild_posts"
  add_foreign_key "labelings", "labels"
  add_foreign_key "labels", "countries"
  add_foreign_key "labels", "industries"
  add_foreign_key "labels", "skills"
  add_foreign_key "matches", "projects"
  add_foreign_key "matches", "specialists"
  add_foreign_key "notifications", "accounts"
  add_foreign_key "notifications", "accounts", column: "actor_id"
  add_foreign_key "off_platform_projects", "specialists"
  add_foreign_key "payments", "companies"
  add_foreign_key "payments", "specialists"
  add_foreign_key "payments", "tasks"
  add_foreign_key "payouts", "specialists"
  add_foreign_key "payouts", "tasks"
  add_foreign_key "post_prompts", "labels"
  add_foreign_key "problematic_flags", "applications"
  add_foreign_key "problematic_flags", "users"
  add_foreign_key "project_industries", "industries"
  add_foreign_key "project_skills", "skills"
  add_foreign_key "projects", "users"
  add_foreign_key "reviews", "specialists"
  add_foreign_key "skill_similarities", "skills", column: "skill1_id"
  add_foreign_key "skill_similarities", "skills", column: "skill2_id"
  add_foreign_key "specialist_industries", "industries"
  add_foreign_key "specialist_industries", "specialists"
  add_foreign_key "specialist_skills", "skills"
  add_foreign_key "specialist_skills", "specialists"
  add_foreign_key "specialists", "accounts"
  add_foreign_key "specialists", "countries"
  add_foreign_key "specialists", "sales_people", column: "interviewer_id"
  add_foreign_key "specialists", "specialists", column: "referrer_id"
  add_foreign_key "subscriptions", "labels"
  add_foreign_key "subscriptions", "specialists"
  add_foreign_key "unresponsiveness_reports", "accounts", column: "reporter_id"
  add_foreign_key "unresponsiveness_reports", "applications"
  add_foreign_key "user_skills", "skills"
  add_foreign_key "user_skills", "users"
  add_foreign_key "users", "accounts"
  add_foreign_key "users", "companies"
  add_foreign_key "users", "countries"
  add_foreign_key "video_calls", "interviews"
  create_function :logidze_logger, sql_definition: <<-SQL
      CREATE OR REPLACE FUNCTION public.logidze_logger()
       RETURNS trigger
       LANGUAGE plpgsql
      AS $function$
        DECLARE
          changes jsonb;
          version jsonb;
          snapshot jsonb;
          new_v integer;
          size integer;
          history_limit integer;
          debounce_time integer;
          current_version integer;
          merged jsonb;
          iterator integer;
          item record;
          columns text[];
          include_columns boolean;
          ts timestamp with time zone;
          ts_column text;
        BEGIN
          ts_column := NULLIF(TG_ARGV[1], 'null');
          columns := NULLIF(TG_ARGV[2], 'null');
          include_columns := NULLIF(TG_ARGV[3], 'null');

          IF TG_OP = 'INSERT' THEN
            -- always exclude log_data column
            changes := to_jsonb(NEW.*) - 'log_data';

            IF columns IS NOT NULL THEN
              snapshot = logidze_snapshot(changes, ts_column, columns, include_columns);
            ELSE
              snapshot = logidze_snapshot(changes, ts_column);
            END IF;

            IF snapshot#>>'{h, -1, c}' != '{}' THEN
              NEW.log_data := snapshot;
            END IF;

          ELSIF TG_OP = 'UPDATE' THEN

            IF OLD.log_data is NULL OR OLD.log_data = '{}'::jsonb THEN
              -- always exclude log_data column
              changes := to_jsonb(NEW.*) - 'log_data';

              IF columns IS NOT NULL THEN
                snapshot = logidze_snapshot(changes, ts_column, columns, include_columns);
              ELSE
                snapshot = logidze_snapshot(changes, ts_column);
              END IF;

              IF snapshot#>>'{h, -1, c}' != '{}' THEN
                NEW.log_data := snapshot;
              END IF;
              RETURN NEW;
            END IF;

            history_limit := NULLIF(TG_ARGV[0], 'null');
            debounce_time := NULLIF(TG_ARGV[4], 'null');

            current_version := (NEW.log_data->>'v')::int;

            IF ts_column IS NULL THEN
              ts := statement_timestamp();
            ELSE
              ts := (to_jsonb(NEW.*)->>ts_column)::timestamp with time zone;
              IF ts IS NULL OR ts = (to_jsonb(OLD.*)->>ts_column)::timestamp with time zone THEN
                ts := statement_timestamp();
              END IF;
            END IF;

            IF NEW = OLD THEN
              RETURN NEW;
            END IF;

            IF current_version < (NEW.log_data#>>'{h,-1,v}')::int THEN
              iterator := 0;
              FOR item in SELECT * FROM jsonb_array_elements(NEW.log_data->'h')
              LOOP
                IF (item.value->>'v')::int > current_version THEN
                  NEW.log_data := jsonb_set(
                    NEW.log_data,
                    '{h}',
                    (NEW.log_data->'h') - iterator
                  );
                END IF;
                iterator := iterator + 1;
              END LOOP;
            END IF;

            changes := '{}';

            IF (coalesce(current_setting('logidze.full_snapshot', true), '') = 'on') THEN
              changes = hstore_to_jsonb_loose(hstore(NEW.*));
            ELSE
              changes = hstore_to_jsonb_loose(
                hstore(NEW.*) - hstore(OLD.*)
              );
            END IF;

            changes = changes - 'log_data';

            IF columns IS NOT NULL THEN
              changes = logidze_filter_keys(changes, columns, include_columns);
            END IF;

            IF changes = '{}' THEN
              RETURN NEW;
            END IF;

            new_v := (NEW.log_data#>>'{h,-1,v}')::int + 1;

            size := jsonb_array_length(NEW.log_data->'h');
            version := logidze_version(new_v, changes, ts);

            IF (
              debounce_time IS NOT NULL AND
              (version->>'ts')::bigint - (NEW.log_data#>'{h,-1,ts}')::text::bigint <= debounce_time
            ) THEN
              -- merge new version with the previous one
              new_v := (NEW.log_data#>>'{h,-1,v}')::int;
              version := logidze_version(new_v, (NEW.log_data#>'{h,-1,c}')::jsonb || changes, ts);
              -- remove the previous version from log
              NEW.log_data := jsonb_set(
                NEW.log_data,
                '{h}',
                (NEW.log_data->'h') - (size - 1)
              );
            END IF;

            NEW.log_data := jsonb_set(
              NEW.log_data,
              ARRAY['h', size::text],
              version,
              true
            );

            NEW.log_data := jsonb_set(
              NEW.log_data,
              '{v}',
              to_jsonb(new_v)
            );

            IF history_limit IS NOT NULL AND history_limit <= size THEN
              NEW.log_data := logidze_compact_history(NEW.log_data, size - history_limit + 1);
            END IF;
          END IF;

          return NEW;
        END;
      $function$
  SQL
  create_function :logidze_version, sql_definition: <<-SQL
      CREATE OR REPLACE FUNCTION public.logidze_version(v bigint, data jsonb, ts timestamp with time zone)
       RETURNS jsonb
       LANGUAGE plpgsql
      AS $function$
        DECLARE
          buf jsonb;
        BEGIN
          buf := jsonb_build_object(
                    'ts',
                    (extract(epoch from ts) * 1000)::bigint,
                    'v',
                    v,
                    'c',
                    data
                    );
          IF coalesce(current_setting('logidze.meta', true), '') <> '' THEN
            buf := jsonb_insert(buf, '{m}', current_setting('logidze.meta')::jsonb);
          END IF;
          RETURN buf;
        END;
      $function$
  SQL
  create_function :logidze_snapshot, sql_definition: <<-SQL
      CREATE OR REPLACE FUNCTION public.logidze_snapshot(item jsonb, ts_column text DEFAULT NULL::text, columns text[] DEFAULT NULL::text[], include_columns boolean DEFAULT false)
       RETURNS jsonb
       LANGUAGE plpgsql
      AS $function$
        DECLARE
          ts timestamp with time zone;
        BEGIN
          IF ts_column IS NULL THEN
            ts := statement_timestamp();
          ELSE
            ts := coalesce((item->>ts_column)::timestamp with time zone, statement_timestamp());
          END IF;

          IF columns IS NOT NULL THEN
            item := logidze_filter_keys(item, columns, include_columns);
          END IF;

          return json_build_object(
            'v', 1,
            'h', jsonb_build_array(
                    logidze_version(1, item, ts)
                  )
            );
        END;
      $function$
  SQL
  create_function :logidze_filter_keys, sql_definition: <<-SQL
      CREATE OR REPLACE FUNCTION public.logidze_filter_keys(obj jsonb, keys text[], include_columns boolean DEFAULT false)
       RETURNS jsonb
       LANGUAGE plpgsql
      AS $function$
        DECLARE
          res jsonb;
          key text;
        BEGIN
          res := '{}';

          IF include_columns THEN
            FOREACH key IN ARRAY keys
            LOOP
              IF obj ? key THEN
                res = jsonb_insert(res, ARRAY[key], obj->key);
              END IF;
            END LOOP;
          ELSE
            res = obj;
            FOREACH key IN ARRAY keys
            LOOP
              res = res - key;
            END LOOP;
          END IF;

          RETURN res;
        END;
      $function$
  SQL
  create_function :logidze_compact_history, sql_definition: <<-SQL
      CREATE OR REPLACE FUNCTION public.logidze_compact_history(log_data jsonb, cutoff integer DEFAULT 1)
       RETURNS jsonb
       LANGUAGE plpgsql
      AS $function$
        DECLARE
          merged jsonb;
        BEGIN
          LOOP
            merged := jsonb_build_object(
              'ts',
              log_data#>'{h,1,ts}',
              'v',
              log_data#>'{h,1,v}',
              'c',
              (log_data#>'{h,0,c}') || (log_data#>'{h,1,c}')
            );

            IF (log_data#>'{h,1}' ? 'm') THEN
              merged := jsonb_set(merged, ARRAY['m'], log_data#>'{h,1,m}');
            END IF;

            log_data := jsonb_set(
              log_data,
              '{h}',
              jsonb_set(
                log_data->'h',
                '{1}',
                merged
              ) - 0
            );

            cutoff := cutoff - 1;

            EXIT WHEN cutoff <= 0;
          END LOOP;

          return log_data;
        END;
      $function$
  SQL


  create_trigger :logidze_on_accounts, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_accounts BEFORE INSERT OR UPDATE ON public.accounts FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_applications, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_applications BEFORE INSERT OR UPDATE ON public.applications FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_companies, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_companies BEFORE INSERT OR UPDATE ON public.companies FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_interviews, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_interviews BEFORE INSERT OR UPDATE ON public.interviews FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_off_platform_projects, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_off_platform_projects BEFORE INSERT OR UPDATE ON public.off_platform_projects FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_projects, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_projects BEFORE INSERT OR UPDATE ON public.projects FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_specialists, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_specialists BEFORE INSERT OR UPDATE ON public.specialists FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_tasks, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_tasks BEFORE INSERT OR UPDATE ON public.tasks FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_users, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_users BEFORE INSERT OR UPDATE ON public.users FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_case_study_articles, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_case_study_articles BEFORE INSERT OR UPDATE ON public.case_study_articles FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_case_study_companies, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_case_study_companies BEFORE INSERT OR UPDATE ON public.case_study_companies FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_case_study_skills, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_case_study_skills BEFORE INSERT OR UPDATE ON public.case_study_skills FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_case_study_industries, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_case_study_industries BEFORE INSERT OR UPDATE ON public.case_study_industries FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_case_study_sections, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_case_study_sections BEFORE INSERT OR UPDATE ON public.case_study_sections FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_case_study_contents, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_case_study_contents BEFORE INSERT OR UPDATE ON public.case_study_contents FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_case_study_searches, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_case_study_searches BEFORE INSERT OR UPDATE ON public.case_study_searches FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
end
