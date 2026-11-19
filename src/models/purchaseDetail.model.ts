
import prisma from "../config/prisma.js";

export async function crearDetalleCompra(data: {
    quantity: number;
    unitPrice: number;
    purchaseId: number;
    productId: number;
}) {
    return await prisma.purchaseDetail.create({
        data: {
            quantity: data.quantity,
            unitPrice: data.unitPrice,
            purchaseId: data.purchaseId,
            productId: data.productId
        }
    });
}

export async function listarDetallesCompra() {
    return await prisma.purchaseDetail.findMany({
        include: {
            product: true,
            purchase: true
        }
    });
}

export async function buscarDetalleCompraPorId(id: number) {
    return await prisma.purchaseDetail.findUnique({
        where: { id },
        include: {
            product: true,
            purchase: true
        }
    });
}

export async function eliminarDetalleCompra(id: number) {
    return await prisma.purchaseDetail.delete({
        where: { id }
    });
}
