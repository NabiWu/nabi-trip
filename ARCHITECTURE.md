# 代码架构文档

## 📁 项目结构

```
src/
├── components/          # React 组件（UI 层）
│   ├── CurrentInfo.tsx      # 当前日期/位置/天气信息组件
│   ├── DayCard.tsx          # 日期卡片组件
│   ├── LocationMap.tsx      # 地图组件
│   ├── TodayButton.tsx      # "今天"按钮组件
│   └── TripCard.tsx         # 旅行卡片组件
│
├── pages/              # 页面组件（路由层）
│   ├── DayDetail.tsx        # 日期详情页面
│   ├── Home.tsx             # 主页
│   ├── TripOverview.tsx     # 旅行总览页面
│   └── TripStatus.tsx       # 旅行状态页面
│
├── hooks/              # 自定义 React Hooks（业务逻辑层）
│   ├── useCurrentDate.ts         # 当前日期 Hook
│   ├── useLocationAndWeather.ts  # 位置和天气 Hook（完整版）
│   └── useWeather.ts             # 天气 Hook（简化版）
│
├── services/           # 服务层（API 调用）
│   ├── geolocationService.ts     # 地理位置服务
│   └── weatherService.ts         # 天气服务
│
├── utils/              # 工具函数
│   └── dateUtils.ts              # 日期处理工具
│
├── constants/          # 常量定义
│   └── weather.ts                # 天气相关常量
│
├── types/              # TypeScript 类型定义
│   ├── index.ts                  # 核心类型
│   └── weather.ts                # 天气相关类型
│
├── data/               # 数据层
│   ├── mexico.ts                 # 墨西哥行程数据
│   └── trips.ts                  # 统一数据访问层
│
└── styles/             # 样式文件
    ├── animations.css             # 动画样式
    ├── background.css             # 背景样式
    ├── mexico-theme.css           # 墨西哥主题样式
    └── mobile-optimizations.css   # 移动端优化
```

## 🏗️ 架构原则

### 1. **分层架构**
- **UI 层** (`components/`, `pages/`): 纯展示组件，只负责渲染
- **业务逻辑层** (`hooks/`): 封装可复用的业务逻辑
- **服务层** (`services/`): 处理外部 API 调用
- **数据层** (`data/`): 统一的数据访问接口
- **工具层** (`utils/`): 纯函数工具

### 2. **模块化设计**
- 每个模块职责单一
- 模块之间通过清晰的接口通信
- 易于测试和维护

### 3. **可扩展性**
- 添加新旅行：只需在 `data/` 添加数据文件，在 `trips.ts` 注册
- 添加新功能：创建新的 hook 或 service
- 添加新页面：在 `pages/` 创建组件

### 4. **可测试性**
- 纯函数易于单元测试
- Hooks 可以独立测试
- Services 可以 mock 测试
- 组件可以 snapshot 测试

## 📦 模块说明

### Hooks (`hooks/`)

#### `useCurrentDate`
- **职责**: 获取并自动更新当前日期
- **返回**: 格式化后的日期字符串
- **更新频率**: 每分钟

#### `useLocationAndWeather`
- **职责**: 获取用户位置和天气信息（完整版）
- **返回**: `{ location, weather, loading, error, permissionStatus }`
- **使用场景**: 需要完整位置和天气信息的组件

#### `useWeather`
- **职责**: 仅获取天气信息（简化版）
- **返回**: 天气数据或 null
- **使用场景**: 只需要天气信息的组件

### Services (`services/`)

#### `geolocationService`
- `getCurrentPosition()`: 获取用户当前位置
- `reverseGeocode()`: 反向地理编码，获取城市名称

#### `weatherService`
- `fetchWeather()`: 获取天气数据

### Data Layer (`data/`)

#### `trips.ts`
- **统一数据访问接口**
- `getTripById()`: 根据 ID 获取旅行
- `getAllTrips()`: 获取所有旅行
- `tripExists()`: 检查旅行是否存在

### Constants (`constants/`)

#### `weather.ts`
- API 端点常量
- 天气代码到图标的映射
- `getWeatherIcon()`: 获取天气图标

### Types (`types/`)

- **核心类型** (`index.ts`): Trip, DayInfo, Location 等
- **天气类型** (`weather.ts`): WeatherData, LocationData 等

## 🔄 数据流

```
用户操作
  ↓
页面组件 (pages/)
  ↓
自定义 Hooks (hooks/)
  ↓
服务层 (services/)
  ↓
外部 API / 数据层 (data/)
```

## ✅ 重构成果

### 1. **消除代码重复**
- ✅ 天气获取逻辑统一到 `useLocationAndWeather` 和 `useWeather`
- ✅ 天气图标映射统一到 `constants/weather.ts`
- ✅ 数据访问统一到 `data/trips.ts`

### 2. **提升可维护性**
- ✅ 清晰的目录结构
- ✅ 单一职责原则
- ✅ 易于定位和修改代码

### 3. **增强可测试性**
- ✅ 纯函数易于测试
- ✅ Hooks 可以独立测试
- ✅ Services 可以 mock

### 4. **改善可扩展性**
- ✅ 添加新旅行只需添加数据文件
- ✅ 添加新功能只需添加 hook/service
- ✅ 类型安全保证

## 🧪 测试建议

### 单元测试
- `utils/dateUtils.ts`: 日期处理函数
- `constants/weather.ts`: 天气图标映射
- `services/`: API 调用（使用 mock）

### 集成测试
- `hooks/`: Hook 的完整流程
- `components/`: 组件渲染和交互

### E2E 测试
- 页面导航流程
- 用户交互流程

## 📝 代码规范

1. **命名规范**
   - 组件：PascalCase (`CurrentInfo.tsx`)
   - Hooks：camelCase，以 `use` 开头 (`useCurrentDate.ts`)
   - Services：camelCase (`geolocationService.ts`)
   - Types：PascalCase (`WeatherData`)

2. **文件组织**
   - 一个文件一个主要导出
   - 相关类型放在同一目录
   - 常量集中管理

3. **导入顺序**
   - React 相关
   - 第三方库
   - 内部组件
   - 内部 hooks/services/utils
   - 类型定义

## 🚀 未来扩展建议

1. **状态管理**: 如果状态复杂，可考虑引入 Zustand 或 Redux
2. **API 层**: 可添加 API 客户端封装（如 axios）
3. **错误处理**: 可添加全局错误边界和错误处理机制
4. **国际化**: 可添加 i18n 支持
5. **缓存**: 可添加数据缓存机制（如 React Query）

