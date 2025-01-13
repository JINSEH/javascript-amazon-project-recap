# Amazon Clone 
#### Description
This amazon website was built after I learned Javascript, CSS and HTML.

It is an incomplete version of amazon, with miminal functionality including adding items to cart, updating the items quantity and deleting them. 

The checkout page also summarises the order and payment, and displays it to the user.


##### Steps to open the website:
1. Clone my repository

2. Install an extension such as Five Server or live server on your IDE.

3. Go to amazon.html

4. Right click and open with Five/Live Server.

5. You should be directed to the home page.

#### What each of the file do
##### Folders:
1. Backend:
>Files include:
>1. products.json 
>> - Contains information about all the products you see on amazon.html<hr>
>> - It includes the products id, image, name, rating (Such as stars rating and how many people rated)<hr>
>> - Products were fetched from 'https://supersimplebackend.dev/products'

2. Data
>Files include:
>1. products.js
>> - This file segregates the products into its types, such as appliances and clothing. <hr>
>> - With each type, it comes with its own set of extra information such as warranty or instructions. 
>2. deliveryoptions.js
>> - This file provides functionality for the delivery options in the checkout page.<hr>
>> - It will take today's date and add the delivery options date, calculating the expected delivery date for the user. 
>3. cart.js
>> - This file contains functionality for the cart in the home and checkout page. <hr>
>> - It includes saving the cart items in storage, or defaulting to two items in the cart.<hr>
>> - It includes adding items to cart, updating the items information and deleting the item from the cart.

3. images
>> Contains product related images and amazon websites' icons and logo. 

4. scripts
>Folders include:
>> 1. checkout
>> - Contains functionality on how the checkout page works, including 
>>> 1. The checkout header
>>> 2. The order summary
>>> 3. The payment summary
>> 2. utils
>> - Contains money.js that converts and rounds price into two decimal places

>Files include:
>> 1. amazon.js
>>> - Displays information about the product on the home page
>>> - Handles the add to cart function.
>> 2. checkout.js
>>> - Collates all functions from checkout folder and renders everything on the checkout page. 

5. styles:
> Contains styling elements for html using CSS only.

6. HTML pages
> 1. amazon.html
>> - The home page of the website, contains information of all products
>2. checkout.html
>> - Checkout page, contains products ordered and displays payment and order summary
>3. orders.html
>> - Shows orders, displays information on date where order was placed, with the order id and total. 
>4. tracking.html
>> - Shows the order status, whether it is being prepared, shipped or delivered.