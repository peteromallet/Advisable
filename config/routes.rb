require 'sidekiq/web'
Rails.application.routes.draw do
  Sidekiq::Web.use Rack::Auth::Basic do |username, password|
    ActiveSupport::SecurityUtils.secure_compare(
      ::Digest::SHA256.hexdigest(username),
      ::Digest::SHA256.hexdigest(ENV["SIDEKIQ_USERNAME"])
    ) & ActiveSupport::SecurityUtils.secure_compare(
      ::Digest::SHA256.hexdigest(password),
      ::Digest::SHA256.hexdigest(ENV["SIDEKIQ_PASSWORD"])
    )
  end
  mount Sidekiq::Web, at: "/sidekiq"

  namespace :admin do
    resources :applications
    resources :countries
    resources :projects
    resources :skills
    resources :specialists
    resources :users
    resources :webhook_configurations
    resources :webhooks, only: [:index, :show]

    root to: "applications#index"
  end

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  post "/graphql", to: "graphql#execute"

  post '/stripe_events', to: 'stripe_events#create'

  # match every other route to the frontend codebase
  root 'application#frontend'
  get '*path', to: 'application#frontend'
end
