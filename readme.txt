
To run our project you  need a databse connectivity so 
Primarily Open Compss and connect the database to localhost:27017  then create a database called "GiftShop" 
after that  add two collection "carts" and "products" then import the data 
from the corrsponding json files provided along with the project.


After that open two terminals one for server and other for client
In Server terminal:
type "npm start" and hit enter, this will start the server.

In client terminal:
Naviagte to Frontend by typing "cd frontend"  and hit enter
then type "npm start" and hit enter this will satrt the client and open the browser window/tab with the running application

The GiftShop Home sceen loads up here all the products are listed atha are fetched from product collection
User can add new products by clicking on the +NewProduct tab on the right top corner, this would load the add product screen.
User can add all the fields and submit this adds the product to the collection.

User  can also click on the products displayed on the home screen this opens the product ina new window giving all its details
here we have used an api to show all the relevant photos that are of the same brand as the product.
The user can select the quantity and click on add to cart button this adds that product to cart collection
The user can also view the cart by clicking on th cart button from top right corner of the window add all the listings of the cart are displayed
Sometiems it taks time to load the data in cart screen as all the quantities and repective price and total is calculated. 
the user can upadte the quantity or remove the item  and it get upadted at the backend in carts collection.


