class SessionsController < ApiController
  def create
    user = User.find_by(email: user_params[:email])
    if user && user.valid_password?(user_params[:password])
      render json: {
        signed_in: true,
        user: user.as_json(
          only: [:id, :email, :authentication_token]
        )
      }, status: :created
    else
      render json: { signed_in: false }, status: 401
    end
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end

end
