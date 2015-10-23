Rails.application.routes.draw do
  root "static_pages#root"
  get "home", to: "static_pages#home"

  post   "signup", to: "users#create"
  post   "signin", to: "sessions#create"
  delete "logout", to: "sessions#destroy"

  namespace :api, default: { format: :json } do
    resources :albums, only: [:index, :create, :update, :destroy, :show]
    resources :pictures, only: [:index, :destroy]
    patch "transfer", to: "pictures#transfer"
    patch "update_cover", to: "albums#update_cover"
  end

  get "*path", to: "application#not_found"
end
