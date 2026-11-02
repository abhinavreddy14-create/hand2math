FROM node:20-slim

# Install Python3 and pip (slim variant to save space/time)
RUN apt-get update && \
    apt-get install -y --no-install-recommends python3 python3-pip python3-venv && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python dependencies first (better caching)
RUN python3 -m pip install --no-cache-dir --break-system-packages sympy numpy pillow

# Install Node dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source and build frontend
COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV PORT=10000
EXPOSE 10000

CMD ["npm", "run", "start"]
