Arsenal::Application.routes.draw do

  post "staffs/regist"
  get  "staffs/regist_confirm"

  # /staffs/sign_in でパスワード入力画面に遷移させない
  devise_scope :staff do
    get "/staffs/sign_in", :to => "welcome#index"
  end

  devise_for :staffs, controllers: {
    omniauth_callbacks: "staffs/omniauth_callbacks"
  }

  get "home/index"
  get "welcome/index"

  # 管理画面用
  devise_for :admin_users
  mount RailsAdmin::Engine => '/btm_admin', :as => 'rails_admin'

  root "welcome#index"
  get "home", to: "home#index", as: "staff_root"

  # 未登録社員一括表示用api
  scope :api do
    get  "/staffs(.:format)" => "staffs#show"
    get  "/all(.:format)" => "home#all"
  end

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
