get "/",            to: "home#index", as: :root
get "/stories",     to: "home#index"
get "/stories/:id", to: "home#index"
get "/stories/new", to: "home#index"
get "/photos",      to: "home#index"
get "/photos/:id",  to: "home#index"

namespace "api" do
  resources "photos"
end
