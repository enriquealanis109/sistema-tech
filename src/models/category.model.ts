import prisma from "../config/prisma"

export async function crearCategoria(name: string) {
    return await prisma.category.create({
        data: {
            name
        }
    });
}

export async function listarCategorias() {
    return await prisma.category.findMany();
}

export async function buscarCategoriaPorId(id: number) {
    return await prisma.category.findUnique({
        where: {
            id
        }
    });
}

export async function elimininarCategoria(id: number) {
    return await prisma.category.delete({
        where: {
            id
        }
    });
}