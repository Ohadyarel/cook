class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  include SessionsHelper
  helper_method :pantry_default
  def pantry_default
  	{
  		oils: ["Olive oil", "Vegetable oil", "Balsamic vinegar", "White vinegar", "Red vinegar","Soy sauce", "Ketchup", "Mayonnaise", "Dijon mustard","Worcestershire", "Hot sauce"],
  		seasonings: ["Salt", "Black pepper", "Bay leaves", "Cayenne pepper", "Red pepper flakes", "Cumin", "Oregano", "Paprika", "Rosemary", "Thyme", "Cinnamon", "Nutmeg", "Chili powder", "Curry powder", "Vanilla extract"],
  		cans: ["Canned beans", "Capers", "Olives", "Peanut butter", "Chicken stock", "Tomato paste", "Salsa", "Canned Tuna"],
  		grains: ["Breadcrumbs", "Couscous", "Pasta", "Rice", "Dried lentils"],
  		baking: ["Baking powder", "Baking soda", "Brown sugar", "Cornstarch", "All-purpose flour", "Honey"],
  		refrigerator: ["Butter", "Parmesan", "Eggs", "Milk", "Yogurt"],
  		freezer: ["Frozen broccoli", "Frozen corn", "Frozen peas", "Frozen spinach"],
  		storage: ["Garlic", "Onion", "Potato", "Peanuts"],
  		fresh: []
  	}
  end
end
