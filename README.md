# **Proyect Swag Labs with Playwright and TypeScript**

![Static Badge](https://img.shields.io/badge/typescript-blue?style=for-the-badge&logo=typescript&logoColor=black)
![Static Badge](https://img.shields.io/badge/playwright-black?style=for-the-badge&logoColor=black)




In this project, the **Swag Labs** website was automated using **Playwright** and **TypeScript**, applying the **Page Oject Model (POM)** design pattern to improve the maintainbility and scalability of the test code. Swag Labs is a ficticious online store used for automation testing and software testing skills development.

Project Goals: 
1. Test Automation: The primary goal was to automate key workflows on the Swag Labs website to ensure the critical functionalities work correctly.

2. Playwright Usage: Playwright was used to interact with web page elements, as it provides a robust API for handling browsers like Chromium, Firefox and Webkit. Additionally, Playwright offers advanced features such as screenshots capture, video recording, and simulating complex interactions with the page

3. TypeScript Implementation: Automation was developed using TypeScript to take advantage of static typing, improving readability and early error detection.

4. POM Pattern: The Page Object Model (POM) pattern was used to structure the tests efficiently and modularly. This pattern promotes the creation of classes representing pages of sections of the application, encapsuling the logic for interacting with the user interface elements. It makes code reuse easier and simplifies maintenance since changes to the UI only require updates to the corresponding page object classes, rather than updating all test scripts. 

## features

- UI testing using the Page Object Model (POM) pattern. 
- Use of tags to categorize tests (smoke,regression).
- Integration with Allure for datiled test reports.

## Prerequisites

- Node.js installed
- `npm` o `yarn` as the package manager. 
- Playwright intalled globally (`npm install playwright`)

## Installation

1. Clone the repository 
 
```bash
git clone https://github.com/Jeremias-Ezequiel/Project-SwagLabs-Playwright.git
```

2. Install dependencies:

```bash
npm install
```

3. Configure envirnoment variables in a `.env` file

## Usage

To run the tests, it is recommended to use the predefined scripts in the `package.json` file: 

```bash
# Run all tests
npm run test

# Run only smoke tests (quick verification of critical functionalities)
npm run test:smoke

# Run regression tests (verification that existing functionalities have not broken)
npm run test:regression 

# Run tests on a specific browser (Chromium, Firefox, WebKit)
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run tests in parallel to reduce execution time
npm run test:parallel

# Generated a detailer report with Allure
npm run allure:generate

# Open the Allure report in the browser 
npm run allure:open
```

## Project Structure 

```
tests/
|
|-- data/       # Test data
|   
|-- helper/     # Utilities and helper functions for tests
| 
|- interfaces/  # TypeScript interfaces for defining data types   
|   
|-pages/        # Implementation of the Page Object Model (POM)
|   
|-specs/        # Test files organized by functionlity or module 
```

## Contact

If you have any questions, suggestions, or simply want to know more about my work, feel free to reach out via my LinkedIn profile:

[Linkedin - Omonte Jeremias](https://www.linkedin.com/in/omontejeremias/)