ActiveAdmin.register Product do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params :sku, :name, :on, :model, :tag_list, :image_attributes => [:attachment]

form do |f|
    f.semantic_errors *f.object.errors.keys

    f.inputs "Details" do
        f.input :name
        f.input :sku
        f.input :tag_list
        f.input :price
        f.input :description
        f.input :summary
    end

    f.inputs "Images" do
      f.has_many :images, as: :image_item, foreign_key: :image_item_id, :allow_destroy => true do |l|
        l.input :image
      end
    end

    f.actions do
        f.action :submit
        f.action :cancel
    end
end
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

end
