get "/",              to: "home#index", as: :root
get "/photos",        to: "home#index"
get "/countries/:id", to: "home#index"
get "/stories/new",   to: "home#index"
get "/stories/:id",   to: "home#index"

namespace "api" do
  resources "photos", only: [:index]
  get "/countries/counts", to: "countries#counts"
  resources "countries", only: [:index, :show]
  resources "stories", only: [:create]
end
