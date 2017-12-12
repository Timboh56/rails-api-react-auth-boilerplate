require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RootsStudioApp
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.middleware.use Rack::MethodOverride
    config.middleware.use ActionDispatch::Flash
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore
    config.app_generators.scaffold_controller = :scaffold_controller
    config.api_only = true
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'localhost:4200'
        resource '*',
          headers: :any,
          methods: %i(get post put patch delete options head)
      end
    end
    config.to_prepare do
      DeviseController.respond_to :html, :json
    end

  end
end
