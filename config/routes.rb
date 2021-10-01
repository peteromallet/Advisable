# frozen_string_literal: true

require "sidekiq/web"
require "admin_constraint"

Rails.application.routes.draw do
  match "(*any)", to: redirect { |_, req| "https://app.advisable.com#{req.fullpath}" }, via: :all, constraints: {host: "advisable.herokuapp.com"}

  if Rails.env.development? || ENV["STAGING"]
    mount GraphqlPlayground::Rails::Engine, as: "graphql_playground", at: "/playground", graphql_path: "/graphql"
    mount GraphqlPlayground::Rails::Engine, as: "toby_playground", at: "/toby_playground", graphql_path: "/toby_graphql"
  end

  post "/toby_graphql", to: "graphql#toby"
  get "/toby", to: "toby#index"
  get "/toby/*toby", to: "toby#index"

  namespace :admin do
    mount Sidekiq::Web => "/sidekiq", constraints: AdminConstraint.new
    mount PgHero::Engine, at: "pghero", constraints: AdminConstraint.new

    resources :applications
    resources :accounts
    resources :specialists
    resources :users
    resources :interviews
    resources :reviews
    resources :projects
    resources :previous_projects
    resources :video_calls
    resources :companies
    resources :industries
    resources :skills
    resources :project_skills
    resources :countries
    resources :blacklisted_domains
    resources :webhooks, only: %i[index show]
    namespace :guild do
      resources :posts, as: :opportunity
      resources :posts, as: :case_study
      resources :posts, as: :advice_required
      resources :posts do
        post "boost_post", on: :member
      end
    end
    namespace :case_study do
      resources :articles
      resources :skills
      resources :companies
      resources :industries
    end
    resources :events do
      delete :cover_photo, on: :member, action: :destroy_cover_photo
    end
    resources :labels
    resources :post_prompts

    post "resync", to: "application#resync", as: :resync if ENV["STAGING"]
    get "login/:gid", to: "application#login_as", as: :login_as

    post "reset_test", to: "application#reset_test", as: :reset_test if ENV["STAGING"] || Rails.env.development?

    root to: "applications#index"
  end

  post "/graphql", to: "graphql#execute"

  post "/stripe_events", to: "stripe_events#create"

  get "/auth/:provider/callback", to: "auth_providers#create"
  get "/auth/failure", to: "auth_providers#failure"

  get "/guild", to: "application#guild", as: :guild_root
  get "/guild/posts/:id", to: "application#guild_post", as: :guild_post
  get "/guild/*guild_path", to: "application#guild"

  post "/webhooks/twilio_chat", to: "webhooks#twilio_chat"

  # Routes for internal tooling
  get "/internal", to: "application#internal", as: :internal_root
  get "/internal/*guild_path", to: "application#internal"
  post "/projects/send_invites"
  post "/projects/create_linkedin_ad"

  get "accounts/me"
  post "accounts/user"
  post "accounts/specialist"

  post "zapier_interactor/create_application"
  post "zapier_interactor/update_application"
  post "zapier_interactor/update_interview"
  post "zapier_interactor/update_consultation"
  post "zapier_interactor/update_user"
  post "zapier_interactor/update_specialist"
  post "zapier_interactor/update_project"
  post "zapier_interactor/attach_previous_project_image"
  post "zapier_interactor/create_magic_link"
  post "zapier_interactor/enable_guild"
  post "zapier_interactor/boost_guild_post"
  post "zapier_interactor/import_case_study"
  post "zapier_interactor/post_case_study_to_guild"
  post "zapier_interactor/send_email"
  post "zapier_interactor/send_finance_email"
  post "zapier_interactor/create_message"

  # match every other route to the frontend codebase
  root "application#frontend"
  get "/case_studies/:id", to: "application#case_study", as: :public_case_study
  get "*path", to: "application#frontend", constraints: ->(req) { req.path.exclude?("rails/") }
end
