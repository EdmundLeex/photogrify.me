Rails.application.routes.draw do
  root "static_pages#root"

  post   "signup", to: "users#create"
  post   "signin", to: "sessions#create"
  delete "logout", to: "sessions#destroy"

  namespace :api do
  	resources :albums
  end
end
