class AddCategoryIdToUserIngredients < ActiveRecord::Migration
  def change
    add_column :user_ingredients, :category_id, :integer
  end
end
