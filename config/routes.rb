Rails.application.routes.draw do
  namespace :api do
  get 'albums/index'
  end

  root "static_pages#root"

  post   "signup", to: "users#create"
  post   "signin", to: "sessions#create"
  delete "logout", to: "sessions#destroy"

  namespace :api, default: { format: :json } do
  	resources :albums
  end
end
