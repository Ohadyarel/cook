Rails.application.routes.draw do
  resources :users, except: [:index]
  resources :recipes, only: [:index, :show]
  resources :favorites, only: [:index, :create, :destroy]
  resources :sessions, only: [:new, :create, :destroy]

  root 'sessions#new'

  namespace :api do
    resources :recipes, only: [:index,:show]
    resources :ingredients, only:[:create,:destroy]
  end
end
