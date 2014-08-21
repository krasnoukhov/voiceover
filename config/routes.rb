get "/",            to: "home#index", as: :root
get "/photos",      to: "home#index"
get "/stories/new", to: "home#index"
get "/stories/:id", to: "home#index"

namespace "api" do
  resources "photos"
  resources "countries"
  resources "stories"
end
