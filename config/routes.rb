# frozen_string_literal: true

require "sidekiq/web"
require "sidekiq-scheduler/web"
require "admin_constraint"

class LogAndRedirect
  def initialize(path)
    @path = path
  end

  def call(params, request)
    Sentry.capture_message("Redirecting #{request.path} to #{@path}", level: "debug")
    @path % params
  end
end

class UsernameConstraint
  def matches?(request)
    Specialist.accepted.find_by_username_or_id(request.path_parameters[:username])
  end
end

Rails.application.routes.draw do
  match "(*any)", to: redirect { |_, req| "https://app.advisable.com#{req.fullpath}" }, via: :all, constraints: {host: "advisable.herokuapp.com"}

  get "/graphiql", to: "application#graphiql" if Rails.env.development? || ENV.fetch("STAGING", nil)

  mount Sidekiq::Web => "/sidekiq", constraints: AdminConstraint.new
  mount PgHero::Engine, at: "/pghero", constraints: AdminConstraint.new

  post "/toby_graphql", to: "graphql#toby"
  get "/toby/download/:id", to: "toby#download"
  get "/toby", to: "toby#index"
  get "/toby/*toby", to: "toby#index"

  namespace :admin, constraints: AdminConstraint.new do
    get "/", to: redirect("admin/dashboard")
    resources :dashboard, only: [:index] do
      get :finance, on: :collection
    end
    resources :topics, except: [:show] do
      member do
        patch :move
        post :search_articles
        post :add_result
        patch :move_result
        delete :remove_result
      end
    end
  end

  namespace :admin do
    resources :articles, except: [:show] do
      collection do
        get :search
      end
      member do
        post :add_insight
        delete :remove_insight
        post :add_industry
        delete :remove_industry
        post :add_skill
        delete :remove_skill
        get :make_skill_primary
      end
    end
    resources :contents, except: %i[show index] do
      member do
        patch :move
        delete :remove_image
      end
    end
  end

  get "editor/:id", to: "admin/articles#edit", as: :specialist_editor

  post "/graphql", to: "graphql#execute"

  post "/stripe_events", to: "stripe_events#create"
  post "/google_calendar_events", to: "google_calendar_events#create"

  get "/auth/:provider/callback", to: "auth_providers#create"
  get "/auth/failure", to: "auth_providers#failure"

  get "/posts/:id", to: "application#guild_post", as: :guild_post

  get "accounts/me"
  post "accounts/user"
  post "accounts/specialist"

  post "zapier_interactor/update_interview"
  post "zapier_interactor/update_user"
  post "zapier_interactor/update_specialist"
  post "zapier_interactor/create_magic_link"
  post "zapier_interactor/enable_guild"
  post "zapier_interactor/boost_guild_post"
  post "zapier_interactor/import_case_study"
  post "zapier_interactor/send_email"
  post "zapier_interactor/create_message"

  # redirections for old routes
  get "/profile/:username/:article", to: redirect(LogAndRedirect.new("/articles/%{article}"))
  get "/clients/join", to: redirect(LogAndRedirect.new("/join/client"))
  get "/freelancers/join", to: redirect(LogAndRedirect.new("/join/freelancer"))

  get "verify_project/:uid", to: "application#verify_project_redirect"

  # match every other route to the frontend codebase
  root "application#home"
  get "/case_studies/:id", to: "application#case_study"
  get "/articles/:slug", to: "specialists#case_study", as: :specialist_case_study
  get "/profile/:username", to: "specialists#profile", as: :freelancer_profile, constraints: UsernameConstraint.new
  get "*path", to: "application#frontend", constraints: ->(req) { req.path.exclude?("rails/") }
end
