class ProductsController < ApiController
  # GET /products
  def index
    @products = Product.select("id, name").all
    render json: @products.to_json
  end

  # GET /products/:id
  def show
    @product = Product.find(params[:id])
    render json: @product.to_json
  end

end
