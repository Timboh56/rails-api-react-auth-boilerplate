Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  devise_for :products, ActiveAdmin::Devise.config
  devise_for :users
  resources :pages
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  scope '/api' do
    resources :products
    resources :users, only: [:create]
    resources :sessions, only: [:create]


    scope '/auth' do
      get 'is_signed_in', to: 'auth#is_signed_in?'
      delete 'logout', to: 'auth#logout'
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
