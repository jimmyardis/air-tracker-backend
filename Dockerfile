# Build Stage for Frontend
FROM node:18-alpine as frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Production Stage for Backend
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ ./

# Copy built frontend assets to backend public folder 
# (Note: Express needs to be configured to serve this, 
#  or use Nginx. For MVP single container, we serve via Express)
COPY --from=frontend-build /app/frontend/dist ./public

EXPOSE 3000
CMD ["npm", "start"]
