// import { test,  request, expect, APIRequestContext } from "@playwright/test";
// require('dotenv').config(); 

// const username = process.env.USERNAME; 
// const accessKey = process.env.ACCESS_KEY

// test.describe('API tests with Playwright', () => {
//     let apiContext : APIRequestContext; 

//     test.beforeAll(async () => {
//         apiContext = await request.newContext({
//             baseURL : 'https://api.us-east-4.saucelabs.com',
//             extraHTTPHeaders : {
//                 'Authorization' : `Basic ${Buffer.from('${username}:${accessKey}').toString('base64')}`,
//                 'Content-Type' : 'application/json'
//             }
//         })
//     })

//     test('GET', async () => {
//         const response = await apiContext.get('/rest/v1/info/status')
//         expect(response.ok()).toBeTruthy(); 
//         const data = await response.json(); 
//         console.log(data); 
//         expect(data).toHaveProperty('wait_time');
//     })
    

// })
