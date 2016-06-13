class CreateRecipes < ActiveRecord::Migration
  def change
    create_table :recipes do |t|
      t.string :publisher
      t.text :ingredients
      t.string :source_url
      t.string :image_url
      t.float :social_rank
      t.string :title

      t.timestamps null: false
    end
  end
end
