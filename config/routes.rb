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

  if Rails.env.development? || ENV["STAGING"]
    mount GraphqlPlayground::Rails::Engine,
          at: '/playground', graphql_path: '/graphql'
  end

  namespace :admin do
    resources :applications
    resources :countries
    resources :projects
    resources :skills
    resources :specialists
    resources :users
    resources :interviews
    resources :blacklisted_domains
    resources :webhook_events
    resources :webhook_configurations
    resources :webhooks, only: %i[index show]

    post 'resync', to: 'application#resync', as: :resync if ENV['STAGING']
    get 'login/:uid', to: 'application#login_as', as: :login_as

    if ENV['STAGING'] || Rails.env.development?
      post 'reset_test', to: 'application#reset_test', as: :reset_test
    end

    root to: 'applications#index'
  end

  post '/graphql', to: 'graphql#execute'

  post '/stripe_events', to: 'stripe_events#create'

  get '/auth/:provider/callback', to: 'auth_providers#create'

  get '/guild', to: 'application#guild', as: :guild_root
  get '/guild/*guild_path', to: 'application#guild'

  # Routes for internal tooling
  get '/internal', to: 'application#internal', as: :internal_root
  get '/internal/*guild_path', to: 'application#internal'
  post '/projects/send_invites'
  post '/projects/create_linkedin_ad'
  get '/accounts/me'
  post '/accounts/user'
  post '/accounts/specialist'

  # match every other route to the frontend codebase
  root 'application#frontend'
  get '*path',
      to: 'application#frontend',
      constraints: ->(req) { req.path.exclude?('rails/active_storage') }
end
