class AuthController < ApiController
  def is_signed_in?
    if current_user
      render :json => {
        "signed_in" => true,
        "user" => current_user
      }.to_json()
    else
      render :json => {"signed_in" => false}.to_json()
    end
  end

  def logout
    sign_out(current_user)
    render json: { signed_in: false }, status: 200
  end
end
