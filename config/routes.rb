Rails.application.routes.draw do
  resources :jobs, only: [:show]

  # match every other route to the frontend codebase
  get '*path', to: 'application#frontend'
end
