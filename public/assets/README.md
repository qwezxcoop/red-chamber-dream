
# 红楼绘卷 - 艺术素材注入指南

本文件旨在指导您如何通过提供自己的艺术素材（纹理、模型等），将本项目的视觉效果提升到最终的艺术高度。

## 目录结构

所有自定义素材都应放置在 `public/assets` 目录下。

```
public/
└── assets/
    ├── textures/
    │   ├── petal.png
    │   └── ice_normal.png
    └── models/
        └── ... (暂无)
```

## 需要您提供的素材

### 1. 纹理 (Textures)

纹理是赋予 3D 模型表面细节和真实感的关键。

#### a. 花瓣纹理

- **文件:** `petal.png`
- **用途:** 用于 `FlowerPetalTransition.js` 中的花瓣粒子，取代当前的纯色方点。
- **要求:**
    - **尺寸:** 建议 128x128 或 256x256 像素。
    - **背景:** 透明背景。
    - **形状:** 一片单独的、风格化的花瓣，可以是粉色或白色，以契合“花谢花飞”的意象。

#### b. 冰裂纹理 (法线贴图)

- **文件:** `ice_normal.png`
- **用途:** 用于 `CharacterScene.js` 中“冰”的意象，为其表面增加凹凸不平的冰裂细节。
- **要求:**
    - **尺寸:** 建议 512x512 或 1024x1024 像素。
    - **格式:** 标准的法线贴图格式（通常是紫色调）。您可以从各种资源网站找到，或使用工具从灰度高度图生成。

### 2. 3D模型 (Models)

目前，所有的 3D 意象都是由程序化几何体构成。在未来，您可以将它们替换为更精细的、由艺术家制作的 3D 模型。

- **格式:** 推荐使用 `.glb` 或 `.gltf` 格式，因为它们是为 Web 优化的标准格式。
- **替换位置:** 您需要在 `CharacterScene.js` 中，找到对应的几何体组件（如 `Bamboo`, `GoldenLock`），并将其替换为加载您模型的代码。

**示例 (未来):**

```javascript
// 替换前的代码
const GoldenLock = ({ color }) => (
    <Torus args={[0.8, 0.1, 16, 100]} rotation-x={Math.PI / 2}>
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </Torus>
);

// 替换后的代码 (假设您有一个 golden_lock.glb 模型)
import { useGLTF } from '@react-three/drei';

const GoldenLock = ({ color }) => {
    const { nodes } = useGLTF('/assets/models/golden_lock.glb');
    return <primitive object={nodes.Scene} />;
};
```

---

通过遵循本指南，您可以将自己独特的艺术风格注入到这个项目中，使其成为一件真正完整的作品。
