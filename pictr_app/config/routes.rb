Rails.application.routes.draw do
  root "static_pages#root"

  post "signup", to: "users#create"
  post "signin", to: "sessions#create"
  post "logout", to: "sessions#destroy"
end
