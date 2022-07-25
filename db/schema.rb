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

ActiveRecord::Schema[7.0].define(version: 2022_07_22_093922) do
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
    t.string "uid", null: false
    t.datetime "confirmed_at", precision: nil
    t.string "confirmation_digest"
    t.string "reset_digest"
    t.datetime "reset_sent_at", precision: nil
    t.jsonb "permissions", default: []
    t.jsonb "completed_tutorials", default: []
    t.string "confirmation_token"
    t.boolean "test_account"
    t.string "remember_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "log_data"
    t.datetime "deleted_at", precision: nil
    t.jsonb "unsubscribed_from"
    t.datetime "disabled_at", precision: nil
    t.jsonb "features"
    t.string "timezone"
    t.jsonb "showcased_articles"
    t.text "availability"
    t.index ["email"], name: "index_accounts_on_email", unique: true
    t.index ["uid"], name: "index_accounts_on_uid", unique: true
  end

  create_table "action_mailbox_inbound_emails", force: :cascade do |t|
    t.integer "status", default: 0, null: false
    t.string "message_id", null: false
    t.string "message_checksum", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["message_id", "message_checksum"], name: "index_action_mailbox_inbound_emails_uniqueness", unique: true
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", precision: nil, null: false
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
    t.string "checksum"
    t.datetime "created_at", precision: nil, null: false
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "agreements", force: :cascade do |t|
    t.string "uid", null: false
    t.bigint "user_id", null: false
    t.uuid "company_id", null: false
    t.bigint "specialist_id", null: false
    t.string "collaboration"
    t.string "invoicing"
    t.string "status"
    t.integer "hourly_rate"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "log_data"
    t.integer "due_days"
    t.string "reason"
    t.datetime "reminded_at"
    t.index ["company_id"], name: "index_agreements_on_company_id"
    t.index ["specialist_id"], name: "index_agreements_on_specialist_id"
    t.index ["uid"], name: "index_agreements_on_uid", unique: true
    t.index ["user_id"], name: "index_agreements_on_user_id"
  end

  create_table "answers", force: :cascade do |t|
    t.string "content"
    t.bigint "question_id", null: false
    t.bigint "specialist_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "uid", null: false
    t.index ["question_id"], name: "index_answers_on_question_id"
    t.index ["specialist_id"], name: "index_answers_on_specialist_id"
    t.index ["uid"], name: "index_answers_on_uid", unique: true
  end

  create_table "auth_providers", force: :cascade do |t|
    t.string "uid", null: false
    t.string "provider"
    t.string "token"
    t.string "refresh_token"
    t.datetime "expires_at", precision: nil
    t.jsonb "blob"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "account_id", null: false
    t.index ["account_id"], name: "index_auth_providers_on_account_id"
    t.index ["provider", "uid"], name: "index_auth_providers_on_provider_and_uid", unique: true
  end

  create_table "case_study_article_feedbacks", force: :cascade do |t|
    t.bigint "article_id", null: false
    t.bigint "skill_id"
    t.text "feedback"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["article_id"], name: "index_case_study_article_feedbacks_on_article_id"
    t.index ["skill_id"], name: "index_case_study_article_feedbacks_on_skill_id"
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
    t.datetime "published_at", precision: nil
    t.datetime "specialist_approved_at", precision: nil
    t.bigint "specialist_id", null: false
    t.bigint "interviewer_id"
    t.bigint "editor_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "company_id"
    t.jsonb "log_data"
    t.string "airtable_id"
    t.jsonb "company_type"
    t.jsonb "targeting"
    t.text "editor_note"
    t.text "freelancer_edits"
    t.datetime "deleted_at", precision: nil
    t.boolean "hide_from_search", default: false
    t.string "slug"
    t.string "editor_url"
    t.index ["airtable_id"], name: "index_case_study_articles_on_airtable_id", unique: true
    t.index ["company_id"], name: "index_case_study_articles_on_company_id"
    t.index ["editor_id"], name: "index_case_study_articles_on_editor_id"
    t.index ["interviewer_id"], name: "index_case_study_articles_on_interviewer_id"
    t.index ["slug"], name: "index_case_study_articles_on_slug", unique: true
    t.index ["specialist_id"], name: "index_case_study_articles_on_specialist_id"
    t.index ["uid"], name: "index_case_study_articles_on_uid", unique: true
  end

  create_table "case_study_companies", force: :cascade do |t|
    t.string "uid", null: false
    t.string "name"
    t.text "description"
    t.string "website"
    t.string "business_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "log_data"
    t.index ["uid"], name: "index_case_study_companies_on_uid", unique: true
  end

  create_table "case_study_contents", force: :cascade do |t|
    t.string "uid", null: false
    t.bigint "section_id", null: false
    t.string "type"
    t.integer "position"
    t.jsonb "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "log_data"
    t.index ["section_id"], name: "index_case_study_contents_on_section_id"
    t.index ["uid"], name: "index_case_study_contents_on_uid", unique: true
  end

  create_table "case_study_embeddings", force: :cascade do |t|
    t.bigint "article_id", null: false
    t.jsonb "data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["article_id"], name: "index_case_study_embeddings_on_article_id"
  end

  create_table "case_study_favorited_articles", force: :cascade do |t|
    t.bigint "account_id", null: false
    t.bigint "article_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id", "article_id"], name: "index_cs_favorited_articles_on_account_and_article", unique: true
    t.index ["account_id"], name: "index_case_study_favorited_articles_on_account_id"
    t.index ["article_id"], name: "index_case_study_favorited_articles_on_article_id"
  end

  create_table "case_study_industries", force: :cascade do |t|
    t.string "uid", null: false
    t.bigint "article_id", null: false
    t.bigint "industry_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "log_data"
    t.index ["article_id"], name: "index_case_study_industries_on_article_id"
    t.index ["industry_id"], name: "index_case_study_industries_on_industry_id"
    t.index ["uid"], name: "index_case_study_industries_on_uid", unique: true
  end

  create_table "case_study_insights", force: :cascade do |t|
    t.string "uid", null: false
    t.string "airtable_id", null: false
    t.bigint "article_id", null: false
    t.string "title"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["article_id"], name: "index_case_study_insights_on_article_id"
    t.index ["uid"], name: "index_case_study_insights_on_uid", unique: true
  end

  create_table "case_study_interest_articles", force: :cascade do |t|
    t.bigint "interest_id", null: false
    t.bigint "article_id", null: false
    t.decimal "similarity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["article_id"], name: "index_case_study_interest_articles_on_article_id"
    t.index ["interest_id", "article_id"], name: "index_interest_articles_on_interest_id_and_article_id", unique: true
    t.index ["interest_id"], name: "index_case_study_interest_articles_on_interest_id"
  end

  create_table "case_study_interest_previews", force: :cascade do |t|
    t.bigint "account_id", null: false
    t.citext "term"
    t.jsonb "term_data"
    t.string "uid", null: false
    t.jsonb "results"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_case_study_interest_previews_on_account_id"
    t.index ["term", "account_id"], name: "index_case_study_interest_previews_on_term_and_account_id", unique: true
    t.index ["uid"], name: "index_case_study_interest_previews_on_uid", unique: true
  end

  create_table "case_study_interests", force: :cascade do |t|
    t.string "uid", null: false
    t.bigint "account_id", null: false
    t.citext "term"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "log_data"
    t.jsonb "term_data"
    t.decimal "treshold"
    t.index ["account_id"], name: "index_case_study_interests_on_account_id"
    t.index ["term", "account_id"], name: "index_case_study_interests_on_term_and_account_id", unique: true
    t.index ["uid"], name: "index_case_study_interests_on_uid", unique: true
  end

  create_table "case_study_sections", force: :cascade do |t|
    t.string "uid", null: false
    t.bigint "article_id", null: false
    t.string "type"
    t.integer "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "log_data"
    t.index ["article_id"], name: "index_case_study_sections_on_article_id"
    t.index ["uid"], name: "index_case_study_sections_on_uid", unique: true
  end

  create_table "case_study_shared_articles", force: :cascade do |t|
    t.bigint "article_id", null: false
    t.bigint "shared_with_id", null: false
    t.bigint "shared_by_id", null: false
    t.text "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "uid", null: false
    t.index ["article_id"], name: "index_case_study_shared_articles_on_article_id"
    t.index ["shared_by_id"], name: "index_case_study_shared_articles_on_shared_by_id"
    t.index ["shared_with_id"], name: "index_case_study_shared_articles_on_shared_with_id"
    t.index ["uid"], name: "index_case_study_shared_articles_on_uid", unique: true
  end

  create_table "case_study_skills", force: :cascade do |t|
    t.string "uid", null: false
    t.boolean "primary"
    t.bigint "article_id"
    t.bigint "skill_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "log_data"
    t.index ["article_id"], name: "index_case_study_skills_on_article_id"
    t.index ["skill_id"], name: "index_case_study_skills_on_skill_id"
    t.index ["uid"], name: "index_case_study_skills_on_uid", unique: true
  end

  create_table "case_study_topics", force: :cascade do |t|
    t.string "uid", null: false
    t.string "slug", null: false
    t.string "name"
    t.integer "position"
    t.text "description"
    t.citext "term"
    t.jsonb "term_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_case_study_topics_on_slug", unique: true
    t.index ["uid"], name: "index_case_study_topics_on_uid", unique: true
  end

  create_table "companies", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.string "kind"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "sales_person_id"
    t.bigint "industry_id"
    t.string "stripe_customer_id"
    t.string "stripe_setup_intent_id"
    t.string "setup_intent_status"
    t.boolean "payments_setup", default: false
    t.string "project_payment_method"
    t.datetime "accepted_project_payment_terms_at", precision: nil
    t.string "invoice_name"
    t.string "invoice_company_name"
    t.string "billing_email"
    t.string "vat_number"
    t.jsonb "address"
    t.jsonb "goals"
    t.boolean "feedback"
    t.string "business_type"
    t.bigint "budget"
    t.jsonb "log_data"
    t.integer "admin_fee"
    t.string "stripe_payment_method"
    t.string "specialist_description"
    t.string "intent"
    t.string "audience"
    t.index ["industry_id"], name: "index_companies_on_industry_id"
    t.index ["sales_person_id"], name: "index_companies_on_sales_person_id"
  end

  create_table "conversation_participants", force: :cascade do |t|
    t.bigint "account_id", null: false
    t.bigint "conversation_id", null: false
    t.datetime "last_read_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "unread_count"
    t.index ["account_id"], name: "index_conversation_participants_on_account_id"
    t.index ["conversation_id"], name: "index_conversation_participants_on_conversation_id"
  end

  create_table "conversations", force: :cascade do |t|
    t.string "uid", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "idempotency_key"
    t.index ["idempotency_key"], name: "index_conversations_on_idempotency_key"
    t.index ["uid"], name: "index_conversations_on_uid", unique: true
  end

  create_table "countries", force: :cascade do |t|
    t.string "name"
    t.string "currency"
    t.string "airtable_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "uid", null: false
    t.boolean "eu"
    t.string "alpha2"
    t.string "dial_in_number"
    t.index ["uid"], name: "index_countries_on_uid", unique: true
  end

  create_table "event_attendees", force: :cascade do |t|
    t.bigint "event_id"
    t.bigint "specialist_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
    t.bigint "host_id", null: false
    t.boolean "featured", default: false
    t.datetime "published_at", precision: nil
    t.datetime "starts_at", precision: nil
    t.datetime "ends_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "google_calendar_id"
    t.index ["host_id"], name: "index_events_on_host_id"
    t.index ["uid"], name: "index_events_on_uid", unique: true
  end

  create_table "guild_post_engagements", force: :cascade do |t|
    t.bigint "specialist_id"
    t.uuid "guild_post_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["guild_post_id"], name: "index_guild_post_engagements_on_guild_post_id"
    t.index ["specialist_id", "guild_post_id"], name: "index_guild_post_engagements_on_specialist_id_and_guild_post_id", unique: true
    t.index ["specialist_id"], name: "index_guild_post_engagements_on_specialist_id"
  end

  create_table "guild_post_images", force: :cascade do |t|
    t.uuid "guild_post_id"
    t.string "uid", null: false
    t.string "string"
    t.integer "position"
    t.boolean "cover"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["guild_post_id"], name: "index_guild_post_images_on_guild_post_id"
    t.index ["string"], name: "index_guild_post_images_on_string"
    t.index ["uid"], name: "index_guild_post_images_on_uid", unique: true
  end

  create_table "guild_posts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "body"
    t.string "title"
    t.integer "status", default: 0, null: false
    t.bigint "specialist_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "engagements_count", default: 0
    t.boolean "shareable", default: false
    t.boolean "pinned", default: false
    t.datetime "boosted_at", precision: nil
    t.datetime "resolved_at", precision: nil
    t.string "audience_type"
    t.bigint "article_id"
    t.index ["article_id"], name: "index_guild_posts_on_article_id"
    t.index ["specialist_id"], name: "index_guild_posts_on_specialist_id"
  end

  create_table "industries", force: :cascade do |t|
    t.string "name"
    t.string "uid", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "airtable_id"
    t.string "color"
    t.boolean "active"
    t.index ["uid"], name: "index_industries_on_uid", unique: true
  end

  create_table "interview_participants", force: :cascade do |t|
    t.bigint "interview_id", null: false
    t.bigint "account_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_interview_participants_on_account_id"
    t.index ["interview_id"], name: "index_interview_participants_on_interview_id"
  end

  create_table "interviews", force: :cascade do |t|
    t.datetime "starts_at", precision: nil
    t.string "status"
    t.string "time_zone"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "availability_note"
    t.string "zoom_meeting_id"
    t.string "uid", null: false
    t.datetime "call_scheduled_at", precision: nil
    t.datetime "requested_more_time_options_at", precision: nil
    t.datetime "more_time_options_added_at", precision: nil
    t.datetime "client_requested_reschedule_at", precision: nil
    t.datetime "specialist_requested_reschedule_at", precision: nil
    t.jsonb "log_data"
    t.string "google_calendar_id"
    t.string "reason"
    t.bigint "article_id"
    t.bigint "requested_by_id"
    t.string "kind"
    t.index ["article_id"], name: "index_interviews_on_article_id"
    t.index ["requested_by_id"], name: "index_interviews_on_requested_by_id"
    t.index ["uid"], name: "index_interviews_on_uid", unique: true
  end

  create_table "invoices", force: :cascade do |t|
    t.integer "month", null: false
    t.integer "year", null: false
    t.uuid "company_id", null: false
    t.string "key"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "uid", null: false
    t.index ["company_id", "year", "month"], name: "index_invoices_on_company_id_and_year_and_month", unique: true
    t.index ["company_id"], name: "index_invoices_on_company_id"
    t.index ["uid"], name: "index_invoices_on_uid", unique: true
  end

  create_table "labelings", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "label_id", null: false
    t.uuid "guild_post_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["guild_post_id"], name: "index_labelings_on_guild_post_id"
    t.index ["label_id", "guild_post_id"], name: "index_labelings_on_label_id_and_guild_post_id", unique: true
    t.index ["label_id"], name: "index_labelings_on_label_id"
  end

  create_table "labels", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.datetime "published_at", precision: nil
    t.integer "labelings_count"
    t.bigint "country_id"
    t.bigint "industry_id"
    t.bigint "skill_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
    t.datetime "expires_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_magic_links_on_account_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string "uid", null: false
    t.text "content"
    t.bigint "author_id"
    t.bigint "conversation_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "idempotency_key"
    t.string "kind"
    t.uuid "guild_post_id"
    t.jsonb "metadata"
    t.bigint "agreement_id"
    t.bigint "interview_id"
    t.bigint "payment_request_id"
    t.index ["agreement_id"], name: "index_messages_on_agreement_id"
    t.index ["author_id"], name: "index_messages_on_author_id"
    t.index ["conversation_id"], name: "index_messages_on_conversation_id"
    t.index ["guild_post_id"], name: "index_messages_on_guild_post_id"
    t.index ["idempotency_key"], name: "index_messages_on_idempotency_key"
    t.index ["interview_id"], name: "index_messages_on_interview_id"
    t.index ["payment_request_id"], name: "index_messages_on_payment_request_id"
    t.index ["uid"], name: "index_messages_on_uid", unique: true
  end

  create_table "notifications", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.bigint "account_id", null: false
    t.string "action", null: false
    t.datetime "read_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "guild_post_id"
    t.bigint "interview_id"
    t.index ["account_id"], name: "index_notifications_on_account_id"
    t.index ["guild_post_id"], name: "index_notifications_on_guild_post_id"
    t.index ["interview_id"], name: "index_notifications_on_interview_id"
  end

  create_table "payment_requests", force: :cascade do |t|
    t.string "uid", null: false
    t.bigint "specialist_id"
    t.uuid "company_id"
    t.string "status", null: false
    t.integer "amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "log_data"
    t.jsonb "line_items"
    t.string "dispute_reason"
    t.string "cancellation_reason"
    t.string "memo"
    t.datetime "due_at"
    t.datetime "reminded_at"
    t.bigint "agreement_id"
    t.boolean "past_due"
    t.index ["agreement_id"], name: "index_payment_requests_on_agreement_id"
    t.index ["company_id"], name: "index_payment_requests_on_company_id"
    t.index ["specialist_id"], name: "index_payment_requests_on_specialist_id"
    t.index ["uid"], name: "index_payment_requests_on_uid", unique: true
  end

  create_table "payments", force: :cascade do |t|
    t.string "uid", null: false
    t.integer "amount"
    t.integer "admin_fee"
    t.string "status"
    t.uuid "company_id", null: false
    t.bigint "specialist_id", null: false
    t.string "payment_intent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "log_data"
    t.string "payment_method"
    t.integer "retries"
    t.datetime "charged_at", precision: nil
    t.bigint "payment_request_id"
    t.string "pdf_key"
    t.index ["company_id"], name: "index_payments_on_company_id"
    t.index ["payment_request_id"], name: "index_payments_on_payment_request_id"
    t.index ["specialist_id"], name: "index_payments_on_specialist_id"
    t.index ["uid"], name: "index_payments_on_uid", unique: true
  end

  create_table "payouts", force: :cascade do |t|
    t.string "uid", null: false
    t.bigint "specialist_id", null: false
    t.integer "amount"
    t.integer "sourcing_fee"
    t.string "status"
    t.datetime "processed_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "log_data"
    t.bigint "payment_request_id"
    t.index ["payment_request_id"], name: "index_payouts_on_payment_request_id"
    t.index ["specialist_id"], name: "index_payouts_on_specialist_id"
    t.index ["uid"], name: "index_payouts_on_uid", unique: true
  end

  create_table "questions", force: :cascade do |t|
    t.string "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "uid", null: false
    t.index ["uid"], name: "index_questions_on_uid", unique: true
  end

  create_table "reviews", force: :cascade do |t|
    t.string "airtable_id"
    t.bigint "specialist_id"
    t.bigint "project_id"
    t.text "comment"
    t.jsonb "ratings"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "uid", null: false
    t.bigint "case_study_article_id"
    t.string "first_name"
    t.string "last_name"
    t.string "company_name"
    t.string "relationship"
    t.index ["airtable_id"], name: "index_reviews_on_airtable_id"
    t.index ["case_study_article_id"], name: "index_reviews_on_case_study_article_id"
    t.index ["specialist_id"], name: "index_reviews_on_specialist_id"
    t.index ["uid"], name: "index_reviews_on_uid", unique: true
  end

  create_table "sales_people", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "username", null: false
    t.boolean "active"
    t.boolean "out_of_office"
    t.string "slack"
    t.string "calendly_url"
    t.string "asana_id"
    t.string "airtable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "uid", null: false
    t.index ["uid"], name: "index_sales_people_on_uid", unique: true
    t.index ["username"], name: "index_sales_people_on_username", unique: true
  end

  create_table "skill_categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug", null: false
    t.string "description"
    t.index ["slug"], name: "index_skill_categories_on_slug", unique: true
  end

  create_table "skill_category_skills", force: :cascade do |t|
    t.bigint "skill_id", null: false
    t.bigint "skill_category_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["skill_category_id"], name: "index_skill_category_skills_on_skill_category_id"
    t.index ["skill_id"], name: "index_skill_category_skills_on_skill_id"
  end

  create_table "skill_similarities", force: :cascade do |t|
    t.bigint "skill1_id", null: false
    t.bigint "skill2_id", null: false
    t.integer "similarity", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["skill1_id", "skill2_id"], name: "index_skill_similarities_on_skill1_id_and_skill2_id", unique: true
    t.index ["skill1_id"], name: "index_skill_similarities_on_skill1_id"
    t.index ["skill2_id"], name: "index_skill_similarities_on_skill2_id"
  end

  create_table "skills", force: :cascade do |t|
    t.string "name"
    t.string "airtable_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "category"
    t.boolean "profile"
    t.string "uid", null: false
    t.boolean "active"
    t.integer "projects_count", default: 0
    t.integer "specialists_count", default: 0
    t.string "characteristic_placeholder"
    t.string "goal_placeholder"
    t.index ["airtable_id"], name: "index_skills_on_airtable_id", unique: true
    t.index ["uid"], name: "index_skills_on_uid", unique: true
  end

  create_table "specialist_industries", force: :cascade do |t|
    t.bigint "specialist_id", null: false
    t.bigint "industry_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["industry_id"], name: "index_specialist_industries_on_industry_id"
    t.index ["specialist_id"], name: "index_specialist_industries_on_specialist_id"
  end

  create_table "specialist_skills", force: :cascade do |t|
    t.bigint "specialist_id"
    t.bigint "skill_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
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
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.jsonb "ratings", default: {}
    t.integer "reviews_count"
    t.text "bio"
    t.string "uid", null: false
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
    t.decimal "average_score"
    t.integer "project_count"
    t.boolean "guild", default: false
    t.string "community_status"
    t.bigint "account_id"
    t.datetime "community_applied_at", precision: nil
    t.datetime "community_accepted_at", precision: nil
    t.datetime "community_invited_to_call_at", precision: nil
    t.integer "community_score"
    t.integer "member_of_week_email"
    t.jsonb "log_data"
    t.date "unavailable_until"
    t.string "previous_work_description"
    t.string "previous_work_results"
    t.string "ideal_project"
    t.string "vat_number"
    t.string "application_interview_calendly_id"
    t.datetime "application_interview_starts_at", precision: nil
    t.string "iban"
    t.datetime "guild_joined_date", precision: nil
    t.datetime "guild_featured_member_at", precision: nil
    t.string "guild_calendly_link"
    t.bigint "referrer_id"
    t.integer "sourcing_fee"
    t.bigint "interviewer_id"
    t.string "case_study_status"
    t.string "trustpilot_review_status"
    t.string "campaign_medium"
    t.string "application_status"
    t.string "twitter"
    t.string "instagram"
    t.string "medium"
    t.citext "username"
    t.datetime "submitted_at", precision: nil
    t.datetime "invited_to_interview_at", precision: nil
    t.datetime "interview_completed_at", precision: nil
    t.datetime "accepted_at", precision: nil
    t.string "price_range"
    t.index ["account_id"], name: "index_specialists_on_account_id", unique: true
    t.index ["airtable_id"], name: "index_specialists_on_airtable_id"
    t.index ["country_id"], name: "index_specialists_on_country_id"
    t.index ["interviewer_id"], name: "index_specialists_on_interviewer_id"
    t.index ["referrer_id"], name: "index_specialists_on_referrer_id"
    t.index ["uid"], name: "index_specialists_on_uid", unique: true
    t.index ["username"], name: "index_specialists_on_username", unique: true
  end

  create_table "subscriptions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.bigint "specialist_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "label_id"
    t.index ["label_id"], name: "index_subscriptions_on_label_id"
    t.index ["specialist_id", "label_id"], name: "index_subscriptions_on_specialist_id_and_label_id", unique: true
    t.index ["specialist_id"], name: "index_subscriptions_on_specialist_id"
  end

  create_table "toby_views", force: :cascade do |t|
    t.string "name"
    t.string "resource"
    t.jsonb "filters"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "sort_by"
    t.string "sort_order"
    t.index ["resource"], name: "index_toby_views_on_resource"
  end

  create_table "user_skills", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "skill_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["skill_id"], name: "index_user_skills_on_skill_id"
    t.index ["user_id"], name: "index_user_skills_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "airtable_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "uid", null: false
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
    t.string "campaign_medium"
    t.string "contact_status"
    t.string "fid"
    t.integer "locality_importance"
    t.datetime "accepted_guarantee_terms_at", precision: nil
    t.string "talent_quality"
    t.string "rejection_reason"
    t.string "number_of_freelancers"
    t.datetime "application_accepted_at", precision: nil
    t.datetime "application_rejected_at", precision: nil
    t.datetime "application_reminder_at", precision: nil
    t.bigint "account_id"
    t.jsonb "log_data"
    t.uuid "company_id"
    t.datetime "application_interview_starts_at", precision: nil
    t.string "trustpilot_review_status"
    t.datetime "invited_to_interview_at", precision: nil
    t.datetime "submitted_at", precision: nil
    t.string "campaign_content"
    t.index ["account_id"], name: "index_users_on_account_id", unique: true
    t.index ["airtable_id"], name: "index_users_on_airtable_id"
    t.index ["company_id"], name: "index_users_on_company_id"
    t.index ["country_id"], name: "index_users_on_country_id"
    t.index ["uid"], name: "index_users_on_uid", unique: true
  end

  create_table "video_calls", force: :cascade do |t|
    t.string "uid", null: false
    t.bigint "interview_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "fallback"
    t.string "zoom_meeting_id"
    t.string "zoom_passcode"
    t.string "zoom_url"
    t.index ["interview_id"], name: "index_video_calls_on_interview_id"
    t.index ["uid"], name: "index_video_calls_on_uid", unique: true
  end

  create_table "webhooks", force: :cascade do |t|
    t.string "url"
    t.string "status"
    t.jsonb "data"
    t.text "response"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "agreements", "companies"
  add_foreign_key "agreements", "specialists"
  add_foreign_key "agreements", "users"
  add_foreign_key "answers", "questions"
  add_foreign_key "answers", "specialists"
  add_foreign_key "auth_providers", "accounts"
  add_foreign_key "case_study_article_feedbacks", "case_study_articles", column: "article_id"
  add_foreign_key "case_study_article_feedbacks", "case_study_skills", column: "skill_id"
  add_foreign_key "case_study_articles", "accounts", column: "editor_id"
  add_foreign_key "case_study_articles", "accounts", column: "interviewer_id"
  add_foreign_key "case_study_articles", "case_study_companies", column: "company_id"
  add_foreign_key "case_study_articles", "specialists"
  add_foreign_key "case_study_contents", "case_study_sections", column: "section_id"
  add_foreign_key "case_study_embeddings", "case_study_articles", column: "article_id"
  add_foreign_key "case_study_favorited_articles", "accounts"
  add_foreign_key "case_study_favorited_articles", "case_study_articles", column: "article_id"
  add_foreign_key "case_study_industries", "case_study_articles", column: "article_id"
  add_foreign_key "case_study_industries", "industries"
  add_foreign_key "case_study_insights", "case_study_articles", column: "article_id"
  add_foreign_key "case_study_interest_articles", "case_study_articles", column: "article_id"
  add_foreign_key "case_study_interest_articles", "case_study_interests", column: "interest_id"
  add_foreign_key "case_study_interest_previews", "accounts"
  add_foreign_key "case_study_interests", "accounts"
  add_foreign_key "case_study_sections", "case_study_articles", column: "article_id"
  add_foreign_key "case_study_shared_articles", "case_study_articles", column: "article_id"
  add_foreign_key "case_study_shared_articles", "users", column: "shared_by_id"
  add_foreign_key "case_study_shared_articles", "users", column: "shared_with_id"
  add_foreign_key "case_study_skills", "case_study_articles", column: "article_id"
  add_foreign_key "case_study_skills", "skills"
  add_foreign_key "companies", "industries"
  add_foreign_key "companies", "sales_people"
  add_foreign_key "conversation_participants", "accounts"
  add_foreign_key "conversation_participants", "conversations"
  add_foreign_key "event_attendees", "events"
  add_foreign_key "event_attendees", "specialists"
  add_foreign_key "events", "specialists", column: "host_id"
  add_foreign_key "guild_post_engagements", "guild_posts"
  add_foreign_key "guild_post_engagements", "specialists"
  add_foreign_key "guild_post_images", "guild_posts", on_delete: :cascade
  add_foreign_key "guild_posts", "case_study_articles", column: "article_id"
  add_foreign_key "guild_posts", "specialists"
  add_foreign_key "interview_participants", "accounts"
  add_foreign_key "interview_participants", "interviews"
  add_foreign_key "interviews", "accounts", column: "requested_by_id"
  add_foreign_key "interviews", "case_study_articles", column: "article_id"
  add_foreign_key "invoices", "companies"
  add_foreign_key "labelings", "guild_posts"
  add_foreign_key "labelings", "labels"
  add_foreign_key "labels", "countries"
  add_foreign_key "labels", "industries"
  add_foreign_key "labels", "skills"
  add_foreign_key "messages", "accounts", column: "author_id"
  add_foreign_key "messages", "agreements"
  add_foreign_key "messages", "conversations"
  add_foreign_key "messages", "guild_posts"
  add_foreign_key "messages", "payment_requests"
  add_foreign_key "notifications", "accounts"
  add_foreign_key "notifications", "guild_posts"
  add_foreign_key "payment_requests", "agreements"
  add_foreign_key "payment_requests", "companies"
  add_foreign_key "payment_requests", "specialists"
  add_foreign_key "payments", "companies"
  add_foreign_key "payments", "payment_requests"
  add_foreign_key "payments", "specialists"
  add_foreign_key "payouts", "payment_requests"
  add_foreign_key "payouts", "specialists"
  add_foreign_key "reviews", "case_study_articles"
  add_foreign_key "reviews", "specialists"
  add_foreign_key "skill_category_skills", "skill_categories"
  add_foreign_key "skill_category_skills", "skills"
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
  add_foreign_key "user_skills", "skills"
  add_foreign_key "user_skills", "users"
  add_foreign_key "users", "accounts"
  add_foreign_key "users", "companies"
  add_foreign_key "users", "countries"
  add_foreign_key "video_calls", "interviews"
  create_function :logidze_logger, sql_definition: <<-'SQL'
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
  create_function :logidze_version, sql_definition: <<-'SQL'
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
  create_function :logidze_snapshot, sql_definition: <<-'SQL'
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
  create_function :logidze_filter_keys, sql_definition: <<-'SQL'
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
  create_function :logidze_compact_history, sql_definition: <<-'SQL'
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
  create_trigger :logidze_on_agreements, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_agreements BEFORE INSERT OR UPDATE ON public.agreements FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_case_study_articles, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_case_study_articles BEFORE INSERT OR UPDATE ON public.case_study_articles FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_case_study_companies, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_case_study_companies BEFORE INSERT OR UPDATE ON public.case_study_companies FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_case_study_contents, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_case_study_contents BEFORE INSERT OR UPDATE ON public.case_study_contents FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_case_study_industries, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_case_study_industries BEFORE INSERT OR UPDATE ON public.case_study_industries FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_case_study_interests, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_case_study_interests BEFORE INSERT OR UPDATE ON public.case_study_interests FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_case_study_sections, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_case_study_sections BEFORE INSERT OR UPDATE ON public.case_study_sections FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_case_study_skills, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_case_study_skills BEFORE INSERT OR UPDATE ON public.case_study_skills FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_companies, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_companies BEFORE INSERT OR UPDATE ON public.companies FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_interviews, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_interviews BEFORE INSERT OR UPDATE ON public.interviews FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_payment_requests, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_payment_requests BEFORE INSERT OR UPDATE ON public.payment_requests FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_payments, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_payments BEFORE INSERT OR UPDATE ON public.payments FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_payouts, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_payouts BEFORE INSERT OR UPDATE ON public.payouts FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_specialists, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_specialists BEFORE INSERT OR UPDATE ON public.specialists FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_users, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_users BEFORE INSERT OR UPDATE ON public.users FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
end
