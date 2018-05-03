Rails.application.routes.draw do
  root to: "application#not_found"

  resources :jobs, only: [:show]
end
