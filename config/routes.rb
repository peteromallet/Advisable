Rails.application.routes.draw do
  namespace :admin do
    resources :applications
    resources :countries
    resources :projects
    resources :skills
    resources :specialists

    root to: "applications#index"
  end

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  post "/graphql", to: "graphql#execute"

  # match every other route to the frontend codebase
  root 'application#frontend'
  get '*path', to: 'application#frontend'
end
