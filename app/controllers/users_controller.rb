class UsersController < ApiController
  rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity

  def unprocessable_entity
    render json: { errors: @user.errors.full_messages }, status: 422
  end

  def create
    @user = User.new(:email => params[:email], :password => params[:password], :password_confirmation => params[:password])
    @user.save!
    render json: @user.to_json, status: 200
  end
end
