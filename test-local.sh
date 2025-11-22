#!/bin/bash

# React + Vite 本地测试服务器
# 使用 npm run dev 启动开发服务器

echo "🚀 启动 React 开发服务器..."
echo ""

# 尝试加载 nvm（如果存在）
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 如果存在 .nvmrc 文件，使用指定的 Node 版本
if [ -f ".nvmrc" ]; then
    NODE_VERSION=$(cat .nvmrc)
    echo "📌 检测到 .nvmrc 文件，使用 Node.js $NODE_VERSION"
    if command -v nvm &> /dev/null; then
        nvm use $NODE_VERSION 2>/dev/null || nvm install $NODE_VERSION && nvm use $NODE_VERSION
    fi
fi

# 检查 Node.js 版本
NODE_VERSION_NUM=$(node --version 2>/dev/null | cut -d'v' -f2 | cut -d'.' -f1)
if [ -z "$NODE_VERSION_NUM" ] || [ "$NODE_VERSION_NUM" -lt 18 ]; then
    echo "❌ 错误: 需要 Node.js 18+，当前版本: $(node --version 2>/dev/null || echo '未安装')"
    echo ""
    echo "💡 请先升级 Node.js："
    if [ -s "$NVM_DIR/nvm.sh" ]; then
        echo "   运行: nvm install 20 && nvm use 20"
    else
        echo "   1. 安装 nvm: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
        echo "   2. 安装 Node 20: nvm install 20 && nvm use 20"
        echo "   3. 或者从 https://nodejs.org/ 下载安装"
    fi
    exit 1
fi

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 首次运行，正在安装依赖..."
    npm install
    echo ""
fi

echo "✅ Node.js 版本: $(node --version)"
echo "📱 开发服务器将在 http://localhost:5173 启动"
echo "按 Ctrl+C 停止服务器"
echo ""

# 启动 Vite 开发服务器
npm run dev
