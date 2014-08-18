get "/",            to: "home#index", as: :root
get "/sets",        to: "home#index"
get "/sets/:id",    to: "home#index"
get "/sets/new",    to: "home#index"
get "/photos",      to: "home#index"
get "/photos/:id",  to: "home#index"

namespace "api" do
  resources "photos"
end
