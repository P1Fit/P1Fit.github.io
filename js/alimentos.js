// js/alimentos.js

const alimentos = {
  entradas: [
    { nombre: "Ceviche", calorias: 180, proteinas: 22, carbohidratos: 8, grasas: 4, vitaminas: "C, B6" },
    { nombre: "Sopa de pollo", calorias: 150, proteinas: 12, carbohidratos: 10, grasas: 6, vitaminas: "A, B12" },
    { nombre: "Crema de arvejas", calorias: 120, proteinas: 6, carbohidratos: 14, grasas: 3, vitaminas: "B1, K" },
    { nombre: "Sopa a la minuta", calorias: 190, proteinas: 14, carbohidratos: 12, grasas: 7, vitaminas: "B6, B12" },
    { nombre: "Ensalada de palta", calorias: 160, proteinas: 3, carbohidratos: 8, grasas: 14, vitaminas: "E, C" },
    { nombre: "Papa a la huancaína", calorias: 220, proteinas: 5, carbohidratos: 20, grasas: 12, vitaminas: "C, B1" },
    { nombre: "Ají de rocoto", calorias: 130, proteinas: 2, carbohidratos: 10, grasas: 9, vitaminas: "C, A" },
    { nombre: "Tequeños rellenos", calorias: 250, proteinas: 7, carbohidratos: 20, grasas: 15, vitaminas: "D, B2" },
    { nombre: "Causa rellena", calorias: 200, proteinas: 8, carbohidratos: 18, grasas: 10, vitaminas: "C, B6" },
    { nombre: "Bolitas de yuca", calorias: 180, proteinas: 2, carbohidratos: 30, grasas: 8, vitaminas: "C" },
    { nombre: "Ceviche de pota", calorias: 170, proteinas: 20, carbohidratos: 6, grasas: 3, vitaminas: "B6, C" },
    { nombre: "Chicharrón de pota", calorias: 240, proteinas: 18, carbohidratos: 10, grasas: 12, vitaminas: "B12, D" },
    { nombre: "Alitas Bouchet", calorias: 300, proteinas: 25, carbohidratos: 10, grasas: 18, vitaminas: "B3, B12" },
    { nombre: "Anticuchos", calorias: 210, proteinas: 20, carbohidratos: 4, grasas: 12, vitaminas: "B12, A" },
    { nombre: "Tamal", calorias: 280, proteinas: 10, carbohidratos: 28, grasas: 14, vitaminas: "B3, C" },
    { nombre: "Humita", calorias: 190, proteinas: 5, carbohidratos: 26, grasas: 7, vitaminas: "A, B1" },
    { nombre: "Ocopa", calorias: 170, proteinas: 4, carbohidratos: 16, grasas: 10, vitaminas: "B2, K" }
  ],
  fondo: [
    { nombre: "Juane", calorias: 480, proteinas: 25, carbohidratos: 40, grasas: 25, vitaminas: "B12, C" },
    { nombre: "Pollo a la plancha", calorias: 165, proteinas: 31, carbohidratos: 0, grasas: 3.6, vitaminas: "B6, B12" },
    { nombre: "Chanfainita", calorias: 350, proteinas: 18, carbohidratos: 20, grasas: 20, vitaminas: "A, B12" },
    { nombre: "Pollo al horno con arroz a la jardinera", calorias: 400, proteinas: 28, carbohidratos: 35, grasas: 14, vitaminas: "C, B3" },
    { nombre: "Pollo enrollado en salsa blanca", calorias: 420, proteinas: 30, carbohidratos: 12, grasas: 28, vitaminas: "D, B12" },
    { nombre: "Alverjita partida con lomito al jugo", calorias: 380, proteinas: 32, carbohidratos: 16, grasas: 18, vitaminas: "C, B1" },
    { nombre: "Arroz tapado a lo pobre", calorias: 460, proteinas: 20, carbohidratos: 35, grasas: 24, vitaminas: "B2, B3" },
    { nombre: "Arroz a la cubana", calorias: 330, proteinas: 10, carbohidratos: 50, grasas: 12, vitaminas: "A, B6" },
    { nombre: "Lomo saltado", calorias: 450, proteinas: 35, carbohidratos: 22, grasas: 18, vitaminas: "C, B12" },
    { nombre: "Bistec a lo pobre", calorias: 520, proteinas: 38, carbohidratos: 30, grasas: 26, vitaminas: "B12, E" },
    { nombre: "Arroz chaufa", calorias: 410, proteinas: 22, carbohidratos: 38, grasas: 16, vitaminas: "B1, B2" },
    { nombre: "Arroz con pollo", calorias: 390, proteinas: 18, carbohidratos: 40, grasas: 14, vitaminas: "C, B3" },
    { nombre: "Ají de gallina", calorias: 350, proteinas: 20, carbohidratos: 18, grasas: 22, vitaminas: "A, B1" },
    { nombre: "Cau cau", calorias: 280, proteinas: 15, carbohidratos: 16, grasas: 14, vitaminas: "B12, C" },
    { nombre: "Tiradito", calorias: 190, proteinas: 25, carbohidratos: 4, grasas: 6, vitaminas: "D, B3" },
    { nombre: "Seco de cordero", calorias: 470, proteinas: 34, carbohidratos: 14, grasas: 28, vitaminas: "B12, K" },
    { nombre: "Chupe de camarones", calorias: 390, proteinas: 30, carbohidratos: 18, grasas: 20, vitaminas: "B3, E" },
    { nombre: "Escabeche de pescado", calorias: 320, proteinas: 24, carbohidratos: 10, grasas: 18, vitaminas: "A, D" },
    { nombre: "Chicharrón de pescado", calorias: 400, proteinas: 30, carbohidratos: 12, grasas: 22, vitaminas: "D, B12" },
    { nombre: "Choclo con queso", calorias: 280, proteinas: 10, carbohidratos: 26, grasas: 12, vitaminas: "B1, C" },
    { nombre: "Parihuela", calorias: 350, proteinas: 32, carbohidratos: 8, grasas: 16, vitaminas: "B3, D" },
    { nombre: "Arroz con mariscos", calorias: 370, proteinas: 22, carbohidratos: 30, grasas: 16, vitaminas: "B6, B12" },
    { nombre: "Cuy chactado", calorias: 460, proteinas: 34, carbohidratos: 10, grasas: 28, vitaminas: "A, B1" },
    { nombre: "Pollo a la brasa", calorias: 420, proteinas: 32, carbohidratos: 5, grasas: 26, vitaminas: "B3, B12" }
  ],
  postres: [
    { nombre: "Suspiro a la limeña", calorias: 320, proteinas: 5, carbohidratos: 45, grasas: 12, vitaminas: "A" },
    { nombre: "Picarones", calorias: 280, proteinas: 4, carbohidratos: 38, grasas: 14, vitaminas: "B2" },
    { nombre: "Mazamorra morada", calorias: 150, proteinas: 1, carbohidratos: 35, grasas: 1, vitaminas: "C" },
    { nombre: "Alfajores con manjar blanco", calorias: 240, proteinas: 3, carbohidratos: 30, grasas: 12, vitaminas: "B1" },
    { nombre: "Turrón de doña pepa", calorias: 290, proteinas: 3, carbohidratos: 40, grasas: 13, vitaminas: "E" },
    { nombre: "Arroz con leche", calorias: 210, proteinas: 6, carbohidratos: 34, grasas: 5, vitaminas: "D" },
    { nombre: "King Kong de manjar blanco", calorias: 380, proteinas: 4, carbohidratos: 50, grasas: 18, vitaminas: "A" },
    { nombre: "Chocoteja", calorias: 260, proteinas: 2, carbohidratos: 26, grasas: 16, vitaminas: "E" },
    { nombre: "Milhojas de manzana", calorias: 220, proteinas: 3, carbohidratos: 28, grasas: 10, vitaminas: "C" },
    { nombre: "Humita dulce", calorias: 190, proteinas: 4, carbohidratos: 30, grasas: 6, vitaminas: "B1" }
  ],
  bebidas: [
    { nombre: "Emoliente", calorias: 70, proteinas: 1, carbohidratos: 16, grasas: 0, vitaminas: "C" },
    { nombre: "Maca", calorias: 90, proteinas: 2, carbohidratos: 20, grasas: 1, vitaminas: "B1" },
    { nombre: "Quinua", calorias: 110, proteinas: 3, carbohidratos: 18, grasas: 2, vitaminas: "B2" },
    { nombre: "Soya", calorias: 80, proteinas: 4, carbohidratos: 10, grasas: 3, vitaminas: "D" },
    { nombre: "Inca Kola", calorias: 120, proteinas: 0, carbohidratos: 30, grasas: 0, vitaminas: "-" },
    { nombre: "Café con leche", calorias: 60, proteinas: 2, carbohidratos: 8, grasas: 2, vitaminas: "B3" },
    { nombre: "Café", calorias: 5, proteinas: 0, carbohidratos: 1, grasas: 0, vitaminas: "-" },
    { nombre: "Jugo de fresa", calorias: 90, proteinas: 1, carbohidratos: 22, grasas: 0, vitaminas: "C" },
    { nombre: "Chicha morada", calorias: 100, proteinas: 0, carbohidratos: 24, grasas: 0, vitaminas: "C" },
    { nombre: "Leche con cocoa", calorias: 130, proteinas: 4, carbohidratos: 18, grasas: 4, vitaminas: "D" },
    { nombre: "Limonada", calorias: 60, proteinas: 0, carbohidratos: 14, grasas: 0, vitaminas: "C" },
    { nombre: "Chapo", calorias: 120, proteinas: 2, carbohidratos: 26, grasas: 1, vitaminas: "A" },
    { nombre: "Jugo surtido", calorias: 110, proteinas: 1, carbohidratos: 25, grasas: 0, vitaminas: "C" },
    { nombre: "Yogurt", calorias: 90, proteinas: 3, carbohidratos: 12, grasas: 3, vitaminas: "D" },
    { nombre: "Leche", calorias: 80, proteinas: 6, carbohidratos: 10, grasas: 3, vitaminas: "D" },
    { nombre: "Jugo de naranja", calorias: 100, proteinas: 1, carbohidratos: 22, grasas: 0, vitaminas: "C" }
  ],
  frutas: [
    { nombre: "Banana", calorias: 89, proteinas: 1.1, carbohidratos: 22.8, grasas: 0.3, vitaminas: "B6, C" },
    { nombre: "Manzana", calorias: 52, proteinas: 0.3, carbohidratos: 13.8, grasas: 0.2, vitaminas: "C" },
    { nombre: "Mandarina", calorias: 53, proteinas: 0.8, carbohidratos: 13.3, grasas: 0.3, vitaminas: "C" },
    { nombre: "Fresa", calorias: 32, proteinas: 0.7, carbohidratos: 7.7, grasas: 0.3, vitaminas: "C" },
    { nombre: "Uva", calorias: 67, proteinas: 0.6, carbohidratos: 17, grasas: 0.4, vitaminas: "C" },
    { nombre: "Pera", calorias: 57, proteinas: 0.4, carbohidratos: 15, grasas: 0.1, vitaminas: "C" },
    { nombre: "Sandía", calorias: 30, proteinas: 0.6, carbohidratos: 7.6, grasas: 0.2, vitaminas: "A, C" },
    { nombre: "Mango", calorias: 60, proteinas: 0.8, carbohidratos: 15, grasas: 0.4, vitaminas: "A, C" },
    { nombre: "Papaya", calorias: 43, proteinas: 0.5, carbohidratos: 11, grasas: 0.3, vitaminas: "A, C" },
    { nombre: "Pitajaya", calorias: 50, proteinas: 1, carbohidratos: 13, grasas: 0.1, vitaminas: "C" },
    { nombre: "Arándanos", calorias: 57, proteinas: 0.7, carbohidratos: 14.5, grasas: 0.3, vitaminas: "C, K" }
  ],
  desayunos: [
    { nombre: "Pan con huevo", calorias: 250, proteinas: 12, carbohidratos: 22, grasas: 12, vitaminas: "D, B12" },
    { nombre: "Pan con paté", calorias: 270, proteinas: 10, carbohidratos: 24, grasas: 16, vitaminas: "A, B6" },
    { nombre: "Pan con aceituna", calorias: 260, proteinas: 8, carbohidratos: 22, grasas: 14, vitaminas: "E" },
    { nombre: "Pan con chorizo", calorias: 320, proteinas: 14, carbohidratos: 22, grasas: 20, vitaminas: "B12, D" },
    { nombre: "Pan con pollo", calorias: 280, proteinas: 18, carbohidratos: 20, grasas: 10, vitaminas: "B6, B12" },
    { nombre: "Pan con hamburguesa", calorias: 350, proteinas: 20, carbohidratos: 25, grasas: 18, vitaminas: "B3, D" },
    { nombre: "Pan con camote", calorias: 260, proteinas: 6, carbohidratos: 34, grasas: 8, vitaminas: "A, C" },
    { nombre: "Pan con tortilla", calorias: 240, proteinas: 10, carbohidratos: 20, grasas: 10, vitaminas: "B1, D" },
    { nombre: "Pan con queso", calorias: 280, proteinas: 12, carbohidratos: 18, grasas: 16, vitaminas: "D, A" },
    { nombre: "Pan con jamonada", calorias: 300, proteinas: 14, carbohidratos: 22, grasas: 16, vitaminas: "B2, B12" },
    { nombre: "Pan con palta", calorias: 270, proteinas: 6, carbohidratos: 18, grasas: 18, vitaminas: "E, C" }
  ]
};
