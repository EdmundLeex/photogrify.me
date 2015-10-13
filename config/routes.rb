Rails.application.routes.draw do
  root "static_pages#root"
  get "home", to: "static_pages#home"

  post   "signup", to: "users#create"
  post   "signin", to: "sessions#create"
  delete "logout", to: "sessions#destroy"

  namespace :api, default: { format: :json } do
  	resources :albums
  end
end
