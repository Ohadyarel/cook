Rails.application.routes.draw do
  resources :users
  resources :recipes, only: [:index, :show]
  resources :favorites, only: [:index, :create, :destroy]
  resources :sessions, only: [:create, :destroy]

  root 'recipes#index'

  namespace :api do
    resources :recipes, only: [:index,:show]
    resources :ingredients, only:[:create,:destroy]
  end
end
