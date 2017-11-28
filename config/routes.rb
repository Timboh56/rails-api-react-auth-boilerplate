Rails.application.routes.draw do
  devise_for :users
  resources :pages
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  scope '/api' do
    resources :products
    resources :sessions, only: [:create, :destroy]


    scope '/auth' do
      get 'is_signed_in', to: 'auth#is_signed_in?'
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
