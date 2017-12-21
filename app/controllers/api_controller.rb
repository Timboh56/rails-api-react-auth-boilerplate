class ApiController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :check_authorization_header
  rescue_from ActionController::RoutingError, with: :route_not_found

  def route_not_found
    render json: {
      message: "Route not found"
    }, status: 404
  end

  def current_user
    authentication_token = request.headers['authenticationtoken']
    current_user = User.where(authentication_token: authentication_token).first
  end

  private

  def check_authorization_header
    api_key = request.headers['Authorization']
    unless ApiKey.where(key: api_key).exists?
      render json: { message: "Unauthorized." }, status: 420
    end
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :name
    devise_parameter_sanitizer.for(:sign_up) << :provider
    devise_parameter_sanitizer.for(:sign_up) << :uid
  end
end
