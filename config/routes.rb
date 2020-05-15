require 'sidekiq/web'
Rails.application.routes.draw do
  Sidekiq::Web.use Rack::Auth::Basic do |username, password|
    ActiveSupport::SecurityUtils.secure_compare(
      ::Digest::SHA256.hexdigest(username),
      ::Digest::SHA256.hexdigest(ENV['SIDEKIQ_USERNAME'])
    ) &
      ActiveSupport::SecurityUtils.secure_compare(
        ::Digest::SHA256.hexdigest(password),
        ::Digest::SHA256.hexdigest(ENV['SIDEKIQ_PASSWORD'])
      )
  end

  mount Sidekiq::Web, at: '/sidekiq'

  if Rails.env.development?
    mount GraphqlPlayground::Rails::Engine,
          at: '/playground', graphql_path: '/graphql'
  end

  namespace :admin do
    resources :searches
    resources :applications
    resources :countries
    resources :projects
    resources :skills
    resources :specialists
    resources :users
    resources :blacklisted_domains
    resources :webhook_events
    resources :webhook_configurations
    resources :webhooks, only: %i[index show]

    post 'resync', to: 'application#resync', as: :resync if ENV['STAGING']

    root to: 'applications#index'
  end

  post '/graphql', to: 'graphql#execute'

  post '/stripe_events', to: 'stripe_events#create'

  get '/auth/:provider/callback', to: 'auth_providers#create'

  # match every other route to the frontend codebase
  root 'application#frontend'
  get '*path',
      to: 'application#frontend',
      constraints: ->(req) { req.path.exclude? 'rails/active_storage' }
end
