
const {test, expect} =require ('@playwright/test')


//Users are able to search for an item using the search bar
test('Scenario 1', async ({page})=>{


//Navigate to the homepage
    await page.goto('https://magento.softwaretestingboard.com/');

//Put any search term in the search bar
    const search= 'Tees';
    await page.fill('#search', search);
    await page.press('#search', 'Enter');


    await page.waitForSelector('.product-item-name a'); 
    
//Validate that the results returned matches the search term
    const results = await page.$$eval('.product-item-name a', links => links.map(link => link.textContent));
    results.forEach(result => {
      if (!result.toLowerCase().includes(search)) {
        console.log('Search item is not found in ${result}');
      }
      else{
        console.log('You searched valid item successfully');
      }
    });
   
  
})



//Users are able to filter search results under Women’s “Tops” section by CATEGORY and COLOR
test('Scenario 2', async ({page})=>{


//Navigate to the homepage
    await page.goto('https://magento.softwaretestingboard.com/');

//Click on “Tops” under Women category
    await page.click('text=Women');
    await page.click('text=Tops');


//Select any value from the CATEGORY and Select a any COLOR in the filter section
    await page.waitForSelector('text=Tees');
    await page.click('text=Tees');

    await page.waitForSelector('text=Green');
    await page.click('text=Green');

    await page.waitForSelector('.product-item-name a'); 
 
//Validate that the results returned matches the filter criteria
    const results = await page.$$eval('.product-item-name a', links => links.map(link => link.textContent));
    results.forEach(result => {
      if (!result.includes('Tees')) {
        console.log('Filtered category item not found in ${result}');
    }
});


})



//Users are able to view the details of any clothing item from the Gear section and add them to the cart
test('Scenario 3', async ({page})=>{

//Navigate to the homepage
    await page.goto('https://magento.softwaretestingboard.com/');

//Select any item from the Gear section and add them to the cart
    await page.click('a:has-text("Gear")');

    await page.click('.product-item-link');


    await page.click('button#product-addtocart-button');


    const Count = await page.textContent('.counter-number');
  expect(parseInt(Count)).toBeGreaterThan(0); 

//Validate that the item has successfully been added to the cart
  const success = await page.textContent('.message-success');
  expect(success).toContain('Item has successfully been added to the cart');



})



