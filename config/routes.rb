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

  if Rails.env.development? || ENV["STAGING"]
    mount GraphqlPlayground::Rails::Engine, as: "graphql_playground", at: "/playground", graphql_path: "/graphql"
    mount GraphqlPlayground::Rails::Engine, as: "toby_playground", at: "/toby_playground", graphql_path: "/toby_graphql"
  end

  mount Sidekiq::Web => "/sidekiq", constraints: AdminConstraint.new
  mount PgHero::Engine, at: "/pghero", constraints: AdminConstraint.new

  post "/toby_graphql", to: "graphql#toby"
  get "/toby", to: "toby#index"
  get "/toby/*toby", to: "toby#index"

  resources :admin, only: [:index], constraints: AdminConstraint.new do
    get :finance, on: :collection
  end

  post "/graphql", to: "graphql#execute"

  post "/stripe_events", to: "stripe_events#create"

  get "/auth/:provider/callback", to: "auth_providers#create"
  get "/auth/failure", to: "auth_providers#failure"

  get "/posts/:id", to: "application#guild_post", as: :guild_post

  get "accounts/me"
  post "accounts/user"
  post "accounts/specialist"

  get "articles/search"

  post "zapier_interactor/create_application"
  post "zapier_interactor/update_application"
  post "zapier_interactor/update_interview"
  post "zapier_interactor/update_consultation"
  post "zapier_interactor/update_user"
  post "zapier_interactor/update_specialist"
  post "zapier_interactor/update_project"
  post "zapier_interactor/update_task"
  post "zapier_interactor/create_magic_link"
  post "zapier_interactor/enable_guild"
  post "zapier_interactor/boost_guild_post"
  post "zapier_interactor/import_case_study"
  post "zapier_interactor/send_email"
  post "zapier_interactor/create_message"

  # redirections for old routes
  get "/projects/:project/interviews/:id/availability", to: redirect(LogAndRedirect.new("/interviews/%{id}"))
  get "/request_consultation/:id", to: redirect(LogAndRedirect.new("/profile/%{id}"))
  get "/guild/events/:id", to: redirect(LogAndRedirect.new("/events/%{id}"))
  get "/clients/signup", to: redirect(LogAndRedirect.new("/clients/join"))
  get "/freelancers/signup", to: redirect(LogAndRedirect.new("/freelancers/join"))
  get "/guild/posts/:id", to: redirect(LogAndRedirect.new("/posts/%{id}"))
  get "/freelancers/:username/:article", to: redirect(LogAndRedirect.new("/profile/%{username}/%{article}"))
  get "/freelancers/:username", to: redirect(LogAndRedirect.new("/profile/%{username}")), constraints: UsernameConstraint.new

  get "verify_project/:uid", to: "application#verify_project_redirect"

  # match every other route to the frontend codebase
  root "application#frontend"
  get "/case_studies/:id", to: "application#case_study"
  get "/profile/:username/:slug", to: "specialists#case_study", as: :specialist_case_study, constraints: UsernameConstraint.new
  get "/profile/:username", to: "specialists#profile", as: :freelancer_profile, constraints: UsernameConstraint.new
  get "*path", to: "application#frontend", constraints: ->(req) { req.path.exclude?("rails/") }
end
