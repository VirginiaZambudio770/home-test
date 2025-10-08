# 1. Playwright image
FROM mcr.microsoft.com/playwright:latest

# 2. dir
WORKDIR /app

# 3. Config and package json files
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy all
COPY . .

# 6. Install Playwright browsers
RUN npx playwright install

# 7. Commands to run tests
CMD ["npx", "playwright", "test"]
