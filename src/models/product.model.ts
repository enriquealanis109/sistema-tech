
import prisma from "../config/prisma.js";

export async function crearProducto(data: {
    name: string;
    description?: string;
    price: number;
    stock: number;
    categoryId: number;
}) {
    return await prisma.product.create({
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            categoryId: data.categoryId
        }
    });
}

export async function listarProductos() {
    return await prisma.product.findMany({
        include: {
            category: true
        }
    });
}

export async function buscarProductoPorId(id: number) {
    return await prisma.product.findUnique({
        where: { id },
        include: {
            category: true
        }
    });
}

export async function actualizarProducto(
    id: number,
    data: {
        name?: string;
        description?: string;
        price?: number;
        stock?: number;
        categoryId?: number;
    }
) {
    return await prisma.product.update({
        where: { id },
        data
    });
}

export async function eliminarProducto(id: number) {
    return await prisma.product.delete({
        where: { id }
    });
}
