# 基礎映像
FROM node:18-alpine

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製其他檔案
COPY . .

# 編譯前端程式
RUN npm run build

# 曝露應用程式端口
EXPOSE 3000

# 啟動 Next.js 應用
CMD ["npm", "run", "start"]
