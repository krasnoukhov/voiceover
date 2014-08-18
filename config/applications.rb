APP_ENV = ENV["LOTUS_ENV"] || "development"

require "bundler/setup"
Bundler.require(:default, APP_ENV)

module VoiceOver
  DATABASE = "sqlite://db/voiceover.db"

  class Application < Lotus::Application
    configure do
      layout :application
      load_paths << "app"
      templates "app/templates"
      routes "config/routes"
    end
  end
end

Lotus::Controller.configure do
  handle_exceptions false
end

APP = VoiceOver::Application.new
require_relative "mapping"
