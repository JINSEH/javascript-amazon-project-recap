# Amazon Clone 
#### Description
This amazon website was built after I learned Javascript, CSS and HTML.


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