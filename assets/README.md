# FamilyCell and Phone - Tienda Online

## 🚀 Tu tienda está online!

**URL:** https://ri3luej32hi4c.ok.kimi.link

---

## ✨ Funcionalidades incluidas

### 🛒 Carrito de Compras
- Agregar/eliminar productos
- Modificar cantidades
- Persistencia en LocalStorage (no se pierde al recargar)
- Indicador de cantidad en el icono

### 📦 Catálogo de Productos
- **40+ productos** en 7 categorías:
  - Celulares y accesorios
  - Computadoras y periféricos
  - Televisores
  - Ropa (hombre, mujer, niños)
  - Hogar y cocina
  - Gadgets y tecnología
- Búsqueda en tiempo real
- Filtros por categoría y precio
- Ordenamiento por precio, rating, novedades

### 📄 Página de Producto
- Galería de imágenes
- Especificaciones técnicas
- Rating y reseñas
- Productos relacionados
- Selector de cantidad

### 💳 Checkout
- Formulario de datos personales
- Dirección de envío
- Métodos de pago:
  - Efectivo al recibir
  - Transferencia bancaria
  - Tarjeta de crédito/débito
- Resumen del pedido
- Confirmación de compra

### 📅 Sistema de Reservas (Estética)
- 8 servicios disponibles:
  - Manicura básica y semipermanente
  - Uñas acrílicas
  - Pedicura
  - Lifting y extensiones de pestañas
  - Diseño y laminado de cejas
- Selector de fecha y hora
- Formulario de contacto
- Confirmación de reserva

---

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── Navigation.tsx      # Barra de navegación
│   └── CartDrawer.tsx      # Carrito lateral
├── context/
│   └── CartContext.tsx     # Estado global del carrito
├── data/
│   └── inventory.ts        # Productos y servicios
├── pages/
│   ├── HomePage.tsx        # Página principal
│   ├── CatalogPage.tsx     # Catálogo con filtros
│   ├── ProductDetailPage.tsx # Detalle de producto
│   ├── CheckoutPage.tsx    # Finalizar compra
│   └── ReservasPage.tsx    # Reservas de estética
├── App.tsx                 # Router principal
└── main.tsx               # Punto de entrada
```

---

## 🛠️ Tecnologías usadas

- **React 18** + TypeScript
- **Vite** (build tool)
- **Tailwind CSS** (estilos)
- **React Router** (navegación)
- **shadcn/ui** (componentes UI)
- **LocalStorage** (persistencia del carrito)

---

## 📝 Para personalizar

### Agregar más productos
Edita el archivo `src/data/inventory.ts` y agrega productos al array `products`:

```typescript
{
  id: 'cel-005',
  name: 'Nombre del producto',
  description: 'Descripción...',
  price: 999999,
  category: 'celulares',
  image: '/imagen.jpg',
  stock: 10,
  rating: 4.5,
  reviews: 100,
}
```

### Cambiar precios
Busca el producto en `src/data/inventory.ts` y modifica el campo `price`.

### Agregar servicios de estética
Agrega al array `services` en el mismo archivo.

### Cambiar colores
Edita las variables CSS en `src/index.css`:
```css
--family-red: #D32F2F;
--family-pink: #F4B6C2;
--family-cream: #F4F1EC;
```

---

## 📱 Responsive

La tienda está optimizada para:
- 💻 Desktop
- 📱 Mobile
- 📲 Tablet

---

## 🔮 Próximas mejoras sugeridas

- [ ] Integración con MercadoPago
- [ ] Base de datos real (Firebase/Supabase)
- [ ] Panel de administración
- [ ] Sistema de usuarios/login
- [ ] Historial de pedidos
- [ ] Notificaciones por email
- [ ] Chat en vivo

---

¿Necesitas ayuda para personalizar algo? ¡Estoy aquí para ayudarte! 🚀
