class UsersController < ApiController
  def create
    user = User.create!(email: params[:email], password: params[:password])
    render json: user.to_json, status: 200
  end
end
