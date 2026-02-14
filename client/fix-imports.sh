#!/bin/bash

echo "Исправление импортов..."

# Исправляем импорты BoardRuntime
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  's|from ['"'"'"]@/entities/board/lib/BoardRuntime['"'"'"]|from "@/canvas/core/BoardRuntime"|g' {} +

# Исправляем импорты CameraController
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  's|from ['"'"'"]@/entities/board/lib/CameraController['"'"'"]|from "@/canvas/camera/CameraController"|g' {} +

# Исправляем импорты EntityManager
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  's|from ['"'"'"]@/entities/board/model/EntityManager['"'"'"]|from "@/canvas/entities/EntityManager"|g' {} +

# Исправляем импорты layers
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  's|from ['"'"'"]@/entities/board/layers/|from "@/canvas/rendering/layers/|g' {} +

# Исправляем импорты controllers
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  's|from ['"'"'"]@/entities/board/lib/DragController['"'"'"]|from "@/canvas/interaction/DragController"|g' {} +

find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  's|from ['"'"'"]@/entities/board/lib/ResizeController['"'"'"]|from "@/canvas/interaction/ResizeController"|g' {} +

find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  's|from ['"'"'"]@/entities/board/lib/ResizeCalculator['"'"'"]|from "@/canvas/interaction/ResizeCalculator"|g' {} +

# Исправляем импорты shape models
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  's|from ['"'"'"]@/entities/board/model/shape.model['"'"'"]|from "@/canvas/entities/shapes/shape.model"|g' {} +

find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  's|from ['"'"'"]@/entities/board/model/types['"'"'"]|from "@/canvas/entities/shapes/types"|g' {} +

# Исправляем импорты UI компонентов
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  's|from ['"'"'"]@/entities/board/ui/|from "@/entities/Board/|g' {} +

find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  's|from ['"'"'"]@/entities/board['"'"'"]|from "@/entities/Board"|g' {} +

# Исправляем импорты block -> Shape
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  's|from ['"'"'"]@/entities/block|from "@/entities/Shape|g' {} +

echo "Импорты исправлены!"
