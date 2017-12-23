class PostsController < ApiController
  # GET /posts
  def index
    @posts = Post.all
    render json: @posts.to_json
  end

  # GET /posts/:id
  def show
    @post = Post.find(params[:id])
    render json: @post.to_json
  end

end
