'use server'

import {prisma} from "@/lib/prisma";

export async function getStats () {
    try {
        const products = await prisma.product.findMany({
            // by: ['user_id'], _avg: {price: true}, where: {price: {gte: 20}}, orderBy: {_avg: {price: 'desc'}}
            // select: {created_at: true, name: true},
            // include: {categories: {select: {_count: true}}},
            // take: 2, skip: 2
            // where: {name: {contains: 'l', mode: 'insensitive'}}
        })
        const categories = await prisma.category.findMany({
            // where: {name: {contains: 'comp', mode: 'insensitive'}},
            include: {_count: true,products: {include: {product: {include: {user: {select: {email: true}}}}}}},
        })
        const users = await prisma.user.findMany({
            // take: 1, skip: 0,
            // select: {email: true},
            include: {products: {select: {_count: true,}}}
        })
        return {success: true, data: {products, users, categories}}
    } catch (e) {
        return {success: false, data: e}
    }
}